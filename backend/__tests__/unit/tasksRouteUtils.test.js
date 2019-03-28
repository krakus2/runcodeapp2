const taskRouteUtils = require('../../utils/tasksRouteUtils');
const { generateStructure, zipTrescFunc, zipTestyFunc } = taskRouteUtils;
const sampleData = require('../../utils/sampleTestingData');
const taskData = { ...sampleData.taskData };
const Task = require('../../models/Task');

describe('taskRouteUtils', () => {
   it('generateStructure - should return desireable structure', () => {
      //taska trzeba wrzucic do tablicy, bo
      const tasks = generateStructure([taskData]);
      expect(tasks[0]).toHaveLength(taskData.iloscWynikow);
      tasks[0].forEach((elem, i) => {
         expect(elem.Parameters).toHaveLength(taskData.iloscArg);
         expect(elem.MethodName).toBe(taskData.nazwaFunkcji);
         expect(elem.Code).toBe(taskData.code.replace(/  |\r\n|\n|\r/gm, ''));
         //TODO - sprawdz funkcje zmienNazwyTypow, returnValue i returnArrayValue
         expect(elem.ExpectedResult).toBe(
            Number(taskData.wyniki[(i + 1) * (taskData.iloscArg + 1) - 1])
         );
      });
   });
});
