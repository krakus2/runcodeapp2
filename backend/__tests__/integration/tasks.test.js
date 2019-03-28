const request = require('supertest');
const Task = require('../../models/Task');
const sampleData = require('../../utils/sampleTestingData');
require('dotenv').config();
let server;

beforeAll(async () => {
   server = require('../../index');
});

beforeEach(async () => {
   if (process.env.NODE_ENV === 'test') {
      await Task.deleteMany({});
   }
});
afterEach(async () => {
   if (process.env.NODE_ENV === 'test') {
      await Task.deleteMany({});
   }
   server.close();
});

describe('GET /', () => {
   let id;
   it('/api/tasks/all -- 200', () => {
      request(server)
         .get('/api/tasks/all')
         .set('Accept', 'application/json')
         .expect(200);
      //expect(res.status).toBe(200);
   });

   it('/api/tasks/ -- 200', () => {
      request(server)
         .get('/api/tasks/')
         .set('Accept', 'application/json')
         .expect(200);
   });

   it('/api/tasks/id/:id -- should return a task if valid id is passed', async () => {
      const taskData = { ...sampleData.taskData };
      let task = new Task(taskData);
      task = await task.save();
      id = task._id.toHexString();
      request(server)
         .get(`/api/tasks/id/${task._id.toHexString()}`)
         .set('Accept', 'application/json')
         .expect(200);
   });

   xit('/api/tasks/id/:id - should return a 400 if invalid id is passed', () => {
      request(server)
         .get('/api/tasks/id/123')
         .expect(200);
   });

   xit('/api/tasks/id/:id - should return a 404 if there is no task with given id in db', () => {
      request(server)
         .get(`/api/tasks/id/${id}`)
         .expect(404);
   });
   it('/api/tasks/ileostatnich/:x -- should return x last tasks', () => {
      request(server)
         .get(`/api/tasks/ileostatnich/5`)
         .set('Accept', 'application/json')
         .expect(200);
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

describe('POST /', () => {
   it('/api/tasks/ -- should post new task1', async () => {
      const taskData = { ...sampleData.taskData };
      const res = await request(server)
         .post('/api/tasks/')
         .send(taskData);
      //Object.keys(res.body).forEach(elem => console.log(elem));
      //15, bo oprocz podstawowych pol dochodza jeszcze domyslne _id i __v
      expect(Object.keys(res.body).length).toBe(15);
      expect(res.status).toBe(200);
   });
});
