const request = require('supertest');
const mongoose = require('mongoose');
const Task = require('../../models/Task');
const sampleData = require('../../utils/sampleTestingData');
let server;

/* beforeAll(async () => {
   server = require('../../index');
   await Task.deleteMany({});
   server.close();
});

beforeEach(() => {
   server = require('../../index');
});
afterEach(async () => {
   server.close();
   //usuwa wszystkie taski z bazy
   await Task.deleteMany({});
}); */

xdescribe('GET /', () => {
   it('/api/tasks/all -- should return array with the length the same as number of added tasks', async () => {
      const taskData = { ...sampleData.taskData };
      const task = new Task(taskData);
      await task.save();
      const res = await request(server)
         .get('/api/tasks/all')
         .set('Accept', 'application/json');

      expect(res.body[0]).toHaveProperty('imieINazwisko', "Filip 'test' Krakowiak");
      expect(res.body[0]).toHaveProperty('args', [
         'Tablica []',
         'int',
         'Typ prosty',
         'int'
      ]);
      expect(res.status).toBe(200);
      //w bazie znajduje sie jeden task, wiec tablica z taskami powinna miec dlugosc 1
      expect(res.body.length).toBe(1);
   });

   it('/api/tasks/ -- should return array with the length the same as number of added tasks', async () => {
      const taskData = { ...sampleData.taskData };
      const task = new Task(taskData);
      await task.save();
      const res = await request(server)
         .get('/api/tasks/')
         .set('Accept', 'application/json');

      expect(res.body[0][0]).toHaveProperty('ResultTypeName', 'System.Int32');
      expect(res.body[0][0]).toHaveProperty('Parameters', [
         {
            TypeName: 'System.Int32[]',
            Value: [1, 2, 4, 3, 6, 4, 8, 9]
         },
         {
            TypeName: 'System.Int32',
            Value: '1,2,4,3,6,4,8,9'
         }
      ]);
      expect(res.body[0][0]).toHaveProperty('ExpectedResult', 4);
      expect(res.status).toBe(200);
      expect(res.body[0].length).toBe(taskData.iloscWynikow);
   });

   it('/api/tasks/id/:id -- should return a task if valid id is passed', async () => {
      const taskData = { ...sampleData.taskData };
      let task = new Task(taskData);
      task = await task.save();
      //console.log(`/api/tasks/id/${task._id.toHexString()}`);
      const res = await request(server)
         .get(`/api/tasks/id/${task._id.toHexString()}`)
         .set('Accept', 'application/json');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('imieINazwisko', task.imieINazwisko);
   });

   it("/api/tasks/id/:id -- should return a 404 if task with the given id doesn't exist", async () => {
      const ObjectId = mongoose.Types.ObjectId;
      const ID = new ObjectId();
      try {
         await request(server).get(`/api/tasks/id/${ID}`);
      } catch (err) {
         expect(err.status).toEqual(404);
         expect(err.response.text).toEqual("The task with the given ID doesn't exist");
      }
      //expect.assertions(2);
   });

   it('/api/tasks/id/:id - should return a 404 if invalid id is passed', async () => {
      try {
         await request(server).get('/api/tasks/id/123');
      } catch (err) {
         expect(err.status).toEqual(404);
         expect(err.response.text).toEqual('Given ID is not valid');
      }
      //expect.assertions(2);
   });
   it('/api/tasks/ileostatnich/:x -- should return x last tasks', async () => {
      const taskData = { ...sampleData.taskData };
      const data = [];
      for (let i = 0; i < 7; i++) {
         data.push(new Task(taskData));
      }

      await Task.insertMany(data);
      const res = await request(server)
         .get(`/api/tasks/ileostatnich/5`)
         .set('Accept', 'application/json');

      expect(res.status).toEqual(200);
      expect(res.body.length).toBe(5);
   });

   it('/api/tasks/unread -- check if setting unread flag works', async () => {
      const taskData = { ...sampleData.taskData };
      const data = [];
      for (let i = 0; i < 7; i++) {
         data.push(new Task(taskData));
      }

      await Task.insertMany(data);
      await request(server)
         .get('/api/tasks/unread')
         .set('Accept', 'application/json');

      const res = await request(server)
         .get('/api/tasks/unread')
         .set('Accept', 'application/json');

      expect(res.body.length).toBe(0);
      expect(res.status).toEqual(200);
   });

   it('/api/tasks/days/:x -- check if setting unread flag works', async () => {
      //TODO - zrob kilka ze straszymi datami i sprawdz czy zwraca odpowiednia ilosc
      const taskData = { ...sampleData.taskData };
      const data = [];
      for (let i = 0; i < 7; i++) {
         data.push(new Task(taskData));
      }
      await Task.insertMany(data);

      const res = await request(server)
         .get('/api/tasks/days/6')
         .set('Accept', 'application/json');

      expect(res.body.length).toBe(7);
      expect(res.status).toEqual(200);
   });
});

xdescribe('POST /', () => {
   it('/api/tasks/ -- should post new task1', async () => {
      const taskData = { ...sampleData.taskData };
      const res = await request(server)
         .post('/api/tasks/')
         .send(taskData);
      //Object.keys(res.body).forEach(elem => console.log(elem));
      //15, bo oprocz podstawowych pol dochodza jeszcze domyslne _id i __v
      expect(Object.keys(res.body).length).toBe(15);
      expect(Object.values(res.body).some(elem => elem === 'zadTest'));
      expect(res.body).toHaveProperty('opisZadania', sampleData.taskData.opisZadania);
      expect(res.status).toBe(200);
   });

   it('/api/tasks/ -- should catch too short task description', async () => {
      const taskDataError = { ...sampleData.taskDataError };
      try {
         await request(server)
            .post('/api/tasks/')
            .send(taskDataError);
      } catch (err) {
         expect(err.status).toEqual(400);
         expect(err.response.text).toEqual(
            JSON.stringify({
               opisZadania: 'Minimalna długość opisu to 5, a maksymalna 500 znaków'
            })
         );
      }
   });

   it("should catch that user didn't pass task description", async () => {
      let taskDataError = { ...sampleData.taskDataError };
      delete taskDataError.opisZadania;

      try {
         await request(server)
            .post('/api/tasks/')
            .send(taskDataError);
      } catch (err) {
         //console.log(typeof err.response.text); //string
         expect(err.status).toEqual(500);
         expect(err.response.text).toMatch(
            /TypeError: Expected string but received a undefined./
         );
      }
   });
});
