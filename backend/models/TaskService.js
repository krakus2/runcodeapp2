const mongoose = require('mongoose');

const createTask = Task => data => {
   const task = new Task({
      imieINazwisko: data.imieINazwisko,
      nazwaFunkcji: data.nazwaFunkcji,
      tytulZadania: data.tytulZadania,
      opisZadania: data.opisZadania,
      iloscArg: data.iloscArg,
      iloscWynikow: data.iloscWynikow,
      args: data.args,
      returnArgs: data.returnArgs,
      code: data.code,
      wyniki: data.wyniki,
      czyRekurencja: data.czyRekurencja
   });
   return task.save();
};

//from the newest
const listTasks = Task => () => {
   return Task.find().sort('-_id'); //.sort({ _id: -1 });
};

const listXTasks = Task => x => {
   if (typeof x !== 'string') {
      throw new Error(
         'Podałeś błędny parametr, to musi być liczba całkowita większa od 0'
      );
   }
   const ile = Number(x);
   if (!Number.isInteger(ile) || ile <= 0) {
      throw new Error(
         'Podałeś błędny parametr, to musi być liczba całkowita większa od 0'
      );
   } else {
      return Task.find()
         .sort({ _id: -1 }) //zwróci od najnowszych
         .limit(ile);
   }
};

const listTasksWithConditions = Task => condition => {
   if (
      condition === null ||
      condition === undefined ||
      condition.constructor !== Object
   ) {
      throw new Error('Wrong type of passed argument');
   }
   return Task.find(condition).sort({ _id: -1 }); //zwróci od najnowszych
};

const listTasksFromXDays = Task => (x = 7) => {
   if (typeof x !== 'string' || isNaN(Number(x))) {
      throw new Error(
         'Podałeś błędny parametr, to musi być liczba całkowita większa od 0'
      );
   }
   const ile = Number(x);
   if (!Number.isInteger(ile) || ile <= 0) {
      throw new Error(
         'Podałeś błędny parametr, to musi być liczba całkowita większa od 0'
      );
   }
   const date = new Date();
   const olderDate = new Date(date.setDate(date.getDate() - ile));

   return Task.find({ date: { $gte: olderDate } }).sort({ _id: -1 });
};

const findTaskById = Task => async id => {
   if (
      !mongoose.Types.ObjectId.isValid(id) ||
      id !== new mongoose.Types.ObjectId(id).toHexString()
   ) {
      throw new Error('Given ID is not valid');
   }
   const task = await Task.findById(id);
   if (!task) {
      throw new Error("The task with the given ID doesn't exist");
   }

   return task;
};

/* const updateTasks = Task => (filter, update) => {
   if (typeof filter !== 'object' && typeof update !== 'object') {
      throw new Error('Wrong type of passed argument');
   }
   return Task.updateMany(filter, update);
}; */

module.exports = Task => {
   return {
      createTask: createTask(Task),
      listTasks: listTasks(Task),
      listXTasks: listXTasks(Task),
      findTaskById: findTaskById(Task),
      listTasksWithConditions: listTasksWithConditions(Task),
      listTasksFromXDays: listTasksFromXDays(Task)
      //updateTasks: updateTasks(Task)
   };
};
