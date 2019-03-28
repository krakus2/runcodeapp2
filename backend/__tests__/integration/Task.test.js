const mongoose = require('mongoose');
const Task = require('../../models/Task');
const sampleData = require('../../utils/sampleTestingData');
const mongodb = require('../../startup/db')();
require('dotenv').config();

describe('Task model test', () => {
   beforeAll(async () => {
      //console.log(mongoose.connection.readyState);
      if (process.env.NODE_ENV === 'test') {
         await Task.deleteMany({});
      }
   });

   afterEach(async () => {
      //console.log(mongoose.connection.readyState);
      if (process.env.NODE_ENV === 'test') {
         await Task.deleteMany({});
      }
   });

   afterAll(async () => {
      await mongoose.disconnect();
      //console.log(mongoose.connection.readyState);
   });

   it('has a module', () => {
      expect(Task).toBeDefined();
   });

   describe('save task', () => {
      it('saves a task', async () => {
         const taskData = { ...sampleData.taskData };
         let task = new Task(taskData);
         task = await task.save();

         expect(task.imieINazwisko).toEqual(taskData.imieINazwisko);
      });
   });

   describe('get task', () => {
      it('gets a task by findOne function', async () => {
         const taskData = { ...sampleData.taskData };
         let task = new Task(taskData);
         task = await task.save();

         const foundTask = await Task.findOne({ nazwaFunkcji: 'zadTest' });
         //console.log(foundTask);
         expect(foundTask.imieINazwisko).toEqual(taskData.imieINazwisko);
      });

      it('gets a task by findById function', async () => {
         const taskData = { ...sampleData.taskData };
         let task = new Task(taskData);
         task = await task.save();

         const foundTask = await Task.findById(task._id);
         //console.log(foundTask);
         expect(foundTask.imieINazwisko).toEqual(taskData.imieINazwisko);
      });

      it('gets all tasks', async () => {
         const taskData = { ...sampleData.taskData };
         let task = new Task(taskData);
         task = await task.save();

         const foundTasks = await Task.find();
         //console.log(foundTasks);
         expect(foundTasks[0].imieINazwisko).toEqual(taskData.imieINazwisko);
      });

      it('gets all tasks that match conditions', async () => {
         const taskData = { ...sampleData.taskData };
         const data = [];
         const date = new Date();
         const olderDate = new Date(date.setDate(date.getDate() - 5));
         const evenOlderDate = new Date(date.setDate(date.getDate() - 7));
         for (let i = 0; i < 7; i++) {
            if (i == 6) {
               taskData.czyPrzeczytano = true;
               taskData.date = evenOlderDate;
            }
            data.push(new Task(taskData));
         }

         await Task.insertMany(data);

         const foundTasks1 = await Task.find({ czyPrzeczytano: false });
         const foundTasks2 = await Task.find({ date: { $gte: olderDate } });
         //console.log(foundTasks);
         expect(foundTasks1).toHaveLength(6);
         expect(foundTasks2).toHaveLength(6);
      });

      it('gets all tasks and shows only x newest', async () => {
         const taskData = { ...sampleData.taskData };
         const data = [];
         for (let i = 0; i < 7; i++) {
            data.push(new Task(taskData));
         }
         await Task.insertMany(data);
         const limit = 5;
         const foundTasks = await Task.find().limit(limit);
         //console.log(foundTasks);
         expect(foundTasks).toHaveLength(limit);
      });
   });

   describe('update task', () => {
      it('updates a task', async () => {
         const taskData = { ...sampleData.taskData };
         let task = new Task(taskData);
         task = await task.save();
         const testoweImieINazwisko = 'Andrzej Testowy';

         const updatedTask = await Task.findByIdAndUpdate(
            task._id,
            {
               imieINazwisko: testoweImieINazwisko
            },
            { new: true }
         );

         expect(updatedTask.imieINazwisko).toEqual(testoweImieINazwisko);
      });

      it('updates many tasks', async () => {
         const taskData = { ...sampleData.taskData };
         const data = [];
         for (let i = 0; i < 7; i++) {
            data.push(new Task(taskData));
         }
         await Task.insertMany(data);
         const updatedTasks = await Task.updateMany(
            { czyPrzeczytano: false },
            { $set: { czyPrzeczytano: true } }
         );
         //console.log(updatedTasks);
         expect(updatedTasks.n).toBe(7);
      });
   });

   describe('delete task', () => {
      it('deletes a task', async () => {
         const taskData = { ...sampleData.taskData };
         taskData.imieINazwisko = 'lololololo';
         let task = new Task(taskData);
         task = await task.save();

         const deletedTask = await Task.deleteOne({
            imieINazwisko: taskData.imieINazwisko
         });
         //console.log(deletedTask);

         expect(deletedTask.n).toEqual(1);
      });
   });
});
