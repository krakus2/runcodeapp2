const express = require('express');
const router = express.Router();
const validateProfileInput = require('../../validators/task');
const tasksRouteUtils = require('../../utils/tasksRouteUtils');
const TaskService = require('../../models/index');
const {
   createTask,
   listTasks,
   listXTasks,
   findTaskById,
   listTasksWithConditions,
   listTasksFromXDays
} = TaskService;
const { generateStructure, zipTestyFunc, zipTrescFunc } = tasksRouteUtils;

// @route   GET api/tasks/test
// @desc    Test tasks route
// @access  Public
router.get('/test', (req, res) => {
   return res.json({
      msg: 'profiles test work'
   });
});

// @route   GET api/tasks/
// @desc    Get all tasks
// @access  Public
router.get('/all', async (req, res) => {
   let tasks = await listTasks(); //zwróci od najnowszych
   return res.json(tasks);
});

// @route   GET api/tasks/
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
   let tasks = await listTasks(); //zwróci od najnowszych
   let resultAll = generateStructure(tasks);
   return res.json(resultAll);
});

// @route   GET api/tasks/id/:id
// @desc    Get task with given id
// @access  Public
router.get('/id/:id', async (req, res) => {
   const task = await findTaskById(req.params.id);
   return res.json(task);
});

// @route   GET api/tasks/ileostatnich/:x
// @desc    Get x last tasks
// @access  Public
router.get('/ileostatnich/:x', async (req, res) => {
   const tasks = await listXTasks(req.params.x);
   const resultAll = generateStructure(tasks);
   return res.json(resultAll);
});

// @route   GET api/tasks/unread
// @desc    Get all unread tasks
// @access  Public
router.get('/unread', async (req, res) => {
   const tasks = await listTasksWithConditions({ czyPrzeczytano: false });
   if (!tasks.length) {
      return res.json(tasks);
   }
   const resultAll = generateStructure(tasks);
   tasks.forEach(async elem => {
      elem.czyPrzeczytano = true;
      await elem.save();
   });

   return res.json(resultAll);
});

// @route   GET api/tasks/days/:x
// @desc    Get all tasks from x days
// @access  Public
router.get('/days/:x', async (req, res) => {
   const tasks = await listTasksFromXDays(req.params.x);
   const resultAll = generateStructure(tasks);
   return res.json(resultAll);
});

// @route   POST api/tasks/
// @desc    Post new task
// @access  Public
router.post('/', async (req, res) => {
   const { errors, isValid } = validateProfileInput(req.body);
   // Check Validation
   if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
   }
   const task = await createTask({
      imieINazwisko: req.body.imieINazwisko,
      nazwaFunkcji: req.body.nazwaFunkcji,
      tytulZadania: req.body.tytulZadania,
      opisZadania: req.body.opisZadania,
      iloscArg: req.body.iloscArg,
      iloscWynikow: req.body.iloscWynikow,
      args: req.body.args,
      returnArgs: req.body.returnArgs,
      code: req.body.code,
      wyniki: req.body.wyniki,
      czyRekurencja: req.body.czyRekurencja
   });
   return res.send(task);
});

// @route   GET api/tasks/zipTresc
// @desc    Get task details
// @access  Public

router.get('/zipTresc', async (req, res) => {
   const resultAll = await zipTrescFunc();
   return res.json(resultAll);
});

// @route   GET api/tasks/zipTesty
// @desc    Get task tests
// @access  Public

router.get('/zipTesty', async (req, res) => {
   const testy = await zipTestyFunc();
   return res.json(testy);
});

router.post('/exceptionRoute', async (req, res) => {
   console.log('no elo z tasks');
   const { username } = req.body;
   /* since we are not passing username, any operation on undefined will result in error,
   any unhandled error/exception in async await will result 😢😢😢
   [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, 
   promise rejections that are not handled will terminate the Node.js process with a non-zero exit code
   */
   const lengthOfSUername = username.length;
   return res.json({ status: true, length: lengthOfSUername });
});

module.exports = {
   router
};
