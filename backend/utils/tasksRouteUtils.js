const Task = require('../models/Task');
const utils = require('./generateStructureUtils');
const { zmienNazwyTypow, returnValue, returnArrayValue } = utils;

const generateStructure = tasks => {
   const resultAll = [];
   for (let k = 0; k < tasks.length; k++) {
      let result = [];
      for (let i = 0; i < tasks[k].iloscWynikow; i++) {
         let object = {};
         object.MethodName = tasks[k].nazwaFunkcji;
         object.Code = tasks[k].code.replace(/  |\r\n|\n|\r/gm, ''); //usuwa wszystkie tabulacje i znaki nowej linii
         object.Parameters = [];
         for (let j = 0; j < tasks[k].iloscArg; j++) {
            let paramObject = {};
            paramObject.TypeName =
               tasks[k].args[j * 2] === 'Typ prosty'
                  ? `${zmienNazwyTypow(tasks[k].args[j * 2 + 1])}`
                  : `${zmienNazwyTypow(tasks[k].args[j * 2 + 1])}[]`;
            paramObject.Value =
               tasks[k].args[j * 2] === 'Typ prosty'
                  ? returnValue(tasks[k].wyniki[i * 2])
                  : returnArrayValue(tasks[k].wyniki[i * 2]);
            object.Parameters.push(paramObject);
         }
         object.ResultTypeName =
            tasks[k].returnArgs[k] === 'Typ prosty'
               ? `${zmienNazwyTypow(tasks[k].returnArgs[1])}`
               : `${zmienNazwyTypow(tasks[k].returnArgs[1])}[]`;

         object.ExpectedResult =
            tasks[k].returnArgs[k] === 'Typ prosty'
               ? returnValue(tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1])
               : returnArrayValue(tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]);
         if (tasks[k].czyRekurencja) {
            object.CodeChecks = ['RecursionCheck'];
         }
         result.push(object);
      }
      resultAll.push(result);
   }
   return resultAll;
};

const zipTrescFunc = async () => {
   let tasks = await Task.find().sort({ _id: -1 }); //zwróci od najnowszych
   //console.log('resultAll');
   let resultAll = [];
   for (let k = 0; k < tasks.length; k++) {
      let object = {};
      object.id = tasks[k]._id;
      object.imieINazwisko = tasks[k].imieINazwisko;
      object.MethodName = tasks[k].nazwaFunkcji;
      object.opisZadania = tasks[k].opisZadania;
      object.Code = tasks[k].code.replace(/  |\r\n|\n|\r/gm, ''); //usuwa wszystkie tabulacje i znaki nowej linii
      resultAll.push(object);
   }
   return resultAll;
};

const zipTestyFunc = async () => {
   let tasks = await Task.find().sort({ _id: -1 }); //zwróci od najnowszych
   let resultAll = [];
   for (let k = 0; k < tasks.length; k++) {
      let result = [];
      result.push(tasks[k]._id);
      for (let i = 0; i < tasks[k].iloscWynikow; i++) {
         let object = {};
         object.Parameters = [];
         for (let j = 0; j < tasks[k].iloscArg; j++) {
            let paramObject = {};
            paramObject.TypeName =
               tasks[k].args[j * 2] === 'Typ prosty'
                  ? `${utils.zmienNazwyTypow(tasks[k].args[j * 2 + 1])}`
                  : `${utils.zmienNazwyTypow(tasks[k].args[j * 2 + 1])}[]`;
            paramObject.Value =
               tasks[k].args[j * 2] === 'Typ prosty'
                  ? utils.returnValue(tasks[k].wyniki[i * 2])
                  : utils.returnArrayValue(tasks[k].wyniki[i * 2]);
            object.Parameters.push(paramObject);
         }
         object.ResultTypeName =
            tasks[k].returnArgs[k] === 'Typ prosty'
               ? `${utils.zmienNazwyTypow(tasks[k].returnArgs[1])}`
               : `${utils.zmienNazwyTypow(tasks[k].returnArgs[1])}[]`;

         object.ExpectedResult =
            tasks[k].returnArgs[k] === 'Typ prosty'
               ? utils.returnValue(tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1])
               : utils.returnArrayValue(
                    tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]
                 );
         if (tasks[k].czyRekurencja) {
            object.CodeChecks = ['RecursionCheck'];
         }
         result.push(object);
      }
      resultAll.push(result);
   }
   return resultAll;
};

function subtractFunc(date) {
   return Math.round((Date.now() - new Date(date)) / (1000 * 3600 * 24));
}

function getSqlYear(d) {
   return `${d.getFullYear()}-${
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
   }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
}

const resolveDataToLineChart = (sqlData, fromValue, task_id) => {
   const data = {
      id: task_id,
      color: 'hsl(349, 70%, 50%)',
      data: []
   };

   if (sqlData.length) {
      const subtract = subtractFunc(sqlData[sqlData.length - 1].date_uploaded);
      const d = new Date();
      const howMany = fromValue === 'all' ? (subtract > 365 ? subtract : 365) : fromValue;

      for (let i = 0; i < howMany; i++) {
         d.setDate(d.getDate() - 1);
         data.data.push({
            x: getSqlYear(d),
            y: 0
         });
      }

      sqlData.forEach((elem, i) => {
         const index = subtractFunc(elem.date_uploaded);
         data.data[index - 1].y++;
      });

      const max = data.data.reduce((acc, curr) => {
         if (curr.y > acc) {
            acc = curr.y;
         }
         return acc;
      }, 0);

      data.max = max;
   }
   return data;
};

const resolveDataToPieChart = sqlData => {
   const data = [
      { id: 'sukces', label: 'sukces', value: 0, color: 'green' },
      { id: 'porażka', label: 'porażka', value: 0, color: 'red' }
   ];

   sqlData.forEach((elem, i) => {
      if (elem.error_count === 0) {
         data[0].value++;
      } else {
         data[1].value++;
      }
   });
   return data;
};

const resolveDataToBarChart = sqlData => {
   const data = sqlData.reduce((acc, elem, i, array) => {
      if (i === 0) {
         acc.push([{ ...elem }]);
      } else {
         if (array[i].id_user !== array[i - 1].id_user) {
            acc.push([{ ...elem }]);
         } else {
            acc[acc.length - 1].push({ ...elem });
         }
      }
      return acc;
   }, []);

   const statsObj = {
      success1: 0,
      defeat1: 0,
      success2: 0,
      defeat2: 0,
      success3: 0,
      defeat3: 0
   };

   data.forEach((elem, i) => {
      if (elem[0] !== undefined) {
         if (elem[0].error_count === 0) {
            statsObj.success1++;
         } else {
            statsObj.defeat1++;
         }
      }
      if (elem[1] !== undefined) {
         if (elem[1].error_count === 0) {
            statsObj.success2++;
         } else {
            statsObj.defeat2++;
         }
      }
      if (elem[2] !== undefined) {
         if (elem[2].error_count === 0) {
            statsObj.success3++;
         } else {
            statsObj.defeat3++;
         }
      }
   });
   const returnData = [];
   for (let i = 0; i < 3; i++) {
      returnData.push({
         attempt: `${i + 1} próba`,
         /* sukcesColor: "hsl(39, 70%, 50%)", */
         value: Math.round(
            (statsObj[`success${i + 1}`] /
               (statsObj.success1 + statsObj[`defeat${i + 1}`])) *
               100
         )
      });
   }
   return returnData;
};

module.exports = {
   generateStructure,
   zipTestyFunc,
   zipTrescFunc,
   resolveDataToLineChart,
   resolveDataToPieChart,
   resolveDataToBarChart
};
