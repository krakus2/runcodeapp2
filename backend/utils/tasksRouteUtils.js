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

module.exports = {
   generateStructure,
   zipTestyFunc,
   zipTrescFunc
};
