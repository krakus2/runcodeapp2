const TaskService = require('../../models/TaskService');
//const sinon = require('sinon');
const sampleData = require('../../utils/sampleTestingData');
const { taskData, taskDataFromDB } = sampleData;
//require('sinon-mongoose');
//const Task = require('../../models/Task');

describe('taskRouteUtils', () => {
   it('has a module', () => {
      expect(TaskService).toBeDefined();
   });

   describe('various listTasks test', () => {
      let mockSort, MockModel, taskService;
      beforeAll(() => {
         /*  const find = sandbox.stub(Task, 'find').callsFake(() => {
            return {
               sort: sinon.stub().returns(taskDataFromDB)
            };
         });*/
         mockSort = jest.fn();
         mockSort.mockResolvedValue(taskDataFromDB);
         MockModel = {
            find: jest.fn(() => {
               return {
                  sort: mockSort
               };
            })
         };
         taskService = TaskService(MockModel);
      });

      beforeEach(() => {
         mockSort.mockClear();
         MockModel.find.mockClear();
      });
      /* it('lists a Tasks - sinon implementation', async () => {
         sinon
            .mock(Task)
            .expects('find')
            .chain('sort')
            .withArgs('-_id')
            .resolves(taskDataFromDB);

         Task.find()
            .sort('-_id')
            .then(result => {
               //console.log(result);
               expect(result).toMatchObject(taskDataFromDB);
            });
      }); */

      it('lists a Tasks', async () => {
         const res = await taskService.listTasks();
         expect(res).toEqual(taskDataFromDB);
         expect(MockModel.find).toHaveBeenCalledTimes(1);
         expect(mockSort).toHaveBeenCalledTimes(1);
      });
      it('listTasksWithConditions -- lists a Tasks that match certain conditions', async () => {
         const res = await taskService.listTasksWithConditions({ czyPrzeczytano: false });
         expect(res).toEqual(taskDataFromDB);
         expect(MockModel.find).toHaveBeenCalledTimes(1);
         expect(mockSort).toHaveBeenCalledTimes(1);
      });

      it('listTasksWithConditions -- wrong argument passed', async () => {
         await expect(() => taskService.listTasksWithConditions({})).not.toThrow(
            new Error('Wrong type of passed argument')
         );
         await expect(() => taskService.listTasksWithConditions([])).toThrow(
            new Error('Wrong type of passed argument')
         );
         await expect(() => taskService.listTasksWithConditions([1, 2, 3])).toThrow(
            new Error('Wrong type of passed argument')
         );
         await expect(() => taskService.listTasksWithConditions([{}, {}])).toThrow(
            new Error('Wrong type of passed argument')
         );
         await expect(() => taskService.listTasksWithConditions('string')).toThrow(
            new Error('Wrong type of passed argument')
         );
         await expect(() => taskService.listTasksWithConditions(null)).toThrow(
            new Error('Wrong type of passed argument')
         );
         await expect(() => taskService.listTasksWithConditions(undefined)).toThrow(
            new Error('Wrong type of passed argument')
         );
         await expect(() => taskService.listTasksWithConditions(123)).toThrow(
            new Error('Wrong type of passed argument')
         );
      });
      it('listTasksFromXDays -- lists a Tasks from x last days', async () => {
         const res = await taskService.listTasksFromXDays('5');
         expect(res).toEqual(taskDataFromDB);
         expect(MockModel.find).toHaveBeenCalledTimes(1);
         expect(mockSort).toHaveBeenCalledTimes(1);
      });

      it('listTasksFromXDays -- wrong argument passed', async () => {
         await expect(() => taskService.listTasksFromXDays({})).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         await expect(() => taskService.listTasksFromXDays([])).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listTasksFromXDays('')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listTasksFromXDays(' abc')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listTasksFromXDays('4.76')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         await expect(() => taskService.listTasksFromXDays('0')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listTasksFromXDays('-1012')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         //nie przechodzi, bo to musi byc string
         await expect(() => taskService.listTasksFromXDays(123)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         await expect(() => taskService.listTasksFromXDays(1.23)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listTasksFromXDays(-2)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listTasksFromXDays(null)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listTasksFromXDays(undefined)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
      });
   });
   describe('other listTasks test', () => {
      it('listXTasks -- lists x last Tasks', async () => {
         const mockLimit = jest.fn();
         mockLimit.mockResolvedValue(taskDataFromDB);
         const MockModel = {
            find: jest.fn(() => {
               return {
                  sort: jest.fn(() => {
                     return {
                        limit: mockLimit
                     };
                  })
               };
            })
         };
         const taskService = TaskService(MockModel);
         const res = await taskService.listXTasks('5');
         expect(res).toEqual(taskDataFromDB);
         expect(mockLimit).toHaveBeenCalledTimes(1);
      });

      it('listXTasks -- should throw an error -- passed not correct argument', async () => {
         const mockLimit = jest.fn();
         mockLimit.mockResolvedValue(taskDataFromDB);
         const MockModel = {
            find: jest.fn(() => {
               return {
                  sort: jest.fn(() => {
                     return {
                        limit: mockLimit
                     };
                  })
               };
            })
         };
         const taskService = TaskService(MockModel);
         await expect(() => taskService.listXTasks(-10)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         await expect(() => taskService.listXTasks('-10')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         await expect(() => taskService.listXTasks('4.76')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         await expect(() => taskService.listXTasks('abc')).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
         await expect(() => taskService.listXTasks([1, 2, 3])).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listXTasks(null)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );

         await expect(() => taskService.listXTasks(undefined)).toThrow(
            new Error('Podałeś błędny parametr, to musi być liczba całkowita większa od 0')
         );
      });

      it('findTaskById -- finds task with given ID', async () => {
         const mockFindById = jest.fn();
         mockFindById.mockResolvedValue(taskDataFromDB);
         const MockModel = {
            findById: mockFindById
         };
         const taskService = TaskService(MockModel);
         const res = await taskService.findTaskById(taskDataFromDB._id);
         expect(res).toEqual(taskDataFromDB);
         expect(mockFindById).toHaveBeenCalledTimes(1);
      });

      it('findTaskById -- should throw an error -- passed not correct argument', async () => {
         const mockFindById = jest.fn();
         mockFindById.mockResolvedValue(taskDataFromDB);
         const MockModel = {
            findById: mockFindById
         };
         const taskService = TaskService(MockModel);
         await expect(taskService.findTaskById('123')).rejects.toThrow(
            new Error('Given ID is not valid')
         );
         await expect(taskService.findTaskById({})).rejects.toThrow(
            new Error('Given ID is not valid')
         );

         await expect(taskService.findTaskById(undefined)).rejects.toThrow(
            new Error('Given ID is not valid')
         );

         await expect(taskService.findTaskById(null)).rejects.toThrow(
            new Error('Given ID is not valid')
         );

         await expect(taskService.findTaskById(1234324234243453)).rejects.toThrow(
            new Error('Given ID is not valid')
         );

         await expect(taskService.findTaskById('rngijuarengiuefkweof12')).rejects.toThrow(
            new Error('Given ID is not valid')
         );
      });

      it('findTaskById -- should throw an error -- there is no task with given ID', async () => {
         const mockFindById = jest.fn();
         const MockModel = {
            findById: mockFindById
         };
         const taskService = TaskService(MockModel);
         await expect(taskService.findTaskById(taskDataFromDB._id)).rejects.toThrow(
            new Error("The task with the given ID doesn't exist")
         );
      });
   });

   describe('createTask test', () => {
      beforeAll(() => {});
      it('creates a Task', async () => {
         const save = jest.fn();
         let name, args;
         const MockModel = function(data) {
            name = data.imieINazwisko;
            args = data.args;

            return {
               ...data,
               save
            };
         };

         const taskService = TaskService(MockModel);
         taskService.createTask(taskData);
         expect(save).toBeCalled();
         expect(name).toBe(taskData.imieINazwisko);
         expect(args).toBe(taskData.args);
      });
   });
});
