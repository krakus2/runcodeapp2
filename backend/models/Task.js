const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   imieINazwisko: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 80,
      trim: true
   },
   tytulZadania: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      trim: true
   },
   opisZadania: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500,
      trim: true
   },
   nazwaFunkcji: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 60,
      trim: true
   },
   iloscArg: {
      type: Number,
      required: true,
      min: 0,
      max: 5
   },
   iloscWynikow: {
      type: Number,
      required: true,
      min: 1
   },
   args: {
      type: Array
   },
   returnArgs: {
      type: [String],
      required: true
   },
   code: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10000
   },
   wyniki: {
      type: [String],
      required: true
   },
   czyRekurencja: {
      type: Boolean,
      required: true
   },
   date: {
      type: Date,
      default: Date.now(),
      required: true
   },
   czyPrzeczytano: {
      type: Boolean,
      default: false,
      required: true
   }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
