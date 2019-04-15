const express = require('express');
const router = express.Router();
const LRU = require('lru-cache');

const validateProfileInput = require('../../validators/task');
const tasksRouteUtils = require('../../utils/tasksRouteUtils');
const TaskService = require('../../models/index');
const db = require('../../startup/sqldb');

['log', 'warn', 'error'].forEach(methodName => {
   const originalMethod = console[methodName];
   console[methodName] = (...args) => {
      let initiator = 'unknown place';
      try {
         throw new Error();
      } catch (e) {
         if (typeof e.stack === 'string') {
            let isFirst = true;
            for (const line of e.stack.split('\n')) {
               const matches = line.match(/^\s+at\s+(.*)/);
               if (matches) {
                  if (!isFirst) {
                     // first line - current function
                     // second line - caller (what we are looking for)
                     initiator = matches[1];
                     break;
                  }
                  isFirst = false;
               }
            }
         }
      }
      originalMethod.apply(console, [...args, '\n', `  at ${initiator}`]);
   };
});

const options = {
   max: 500,
   maxAge: 1000 * 60 * 60
};

const cache = new LRU(options);

const {
   createTask,
   listTasks,
   listXTasks,
   findTaskById,
   listTasksWithConditions,
   listTasksFromXDays
} = TaskService;
const {
   generateStructure,
   zipTestyFunc,
   zipTrescFunc,
   resolveDataToLineChart,
   resolveDataToPieChart,
   resolveDataToBarChart
} = tasksRouteUtils;

// @route   GET api/tasks/test
// @desc    Test tasks route
// @access  Public
router.get('/test', (req, res) => {
   return res.json({
      msg: 'profiles test work'
   });
});

// @route   GET api/tasks/tests
// @desc    get tests from sql database
// @access  Public
router.get('/tests', (req, res) => {
   const result = {};
   console.log(result['x']);
   db.query('SELECT * FROM `task_submit`', function(error, results, fields) {
      //TODO - obsluga pustej zwrotki z bazy i bledu
      results.forEach((elem, i) => {
         if (result[elem.id_task] === undefined) {
            result[elem.id_task] = [];
            result[elem.id_task].push(elem);
         } else {
            result[elem.id_task].push(elem);
         }
      });
      return res.json(result);
   });
});

// @route   GET api/tasks/teststask_id=:id&test_date=:date
// @desc    get specified portion of tests data
// @access  Public
//TODO - ustawic serwer tak, by co jakis czas sam czyscil cache ze starych obiektow
//       za pomoca metody cache.prune()
router.get('/tests/task_id=:id&test_date=:date&from_value=:fromValue', (req, res) => {
   const { id, date, fromValue } = req.params;
   /*    console.log(cache.itemCount, "z cache'u");
   console.log(cache.keys().forEach(elem => console.log(elem, "z cache'u")), Date.now()); */
   if (cache.has(`id=${id}&from_value=${fromValue}`)) {
      return res.json(cache.get(`id=${id}&from_value=${fromValue}`));
   } else {
      if (date !== 'all') {
         db.query(
            `SELECT * FROM \`task_submit\` WHERE id_task=${id} AND date_uploaded >= '${date}' ORDER by id_user`,
            function(error, results, fields) {
               console.log(`id=${id}&from_value=${fromValue}`);
               cache.set(`id=${id}&from_value=${fromValue}`, [
                  resolveDataToLineChart(results, fromValue, id),
                  resolveDataToPieChart(results),
                  resolveDataToBarChart(results)
               ]);
               return res.json(cache.get(`id=${id}&from_value=${fromValue}`));
            }
         );
      } else {
         db.query(
            `SELECT * FROM \`task_submit\` WHERE id_task=${id} ORDER by id_user`,
            function(error, results, fields) {
               console.log(`id=${id}&from_value=${fromValue}`);
               cache.set(`id=${id}&from_value=${fromValue}`, [
                  resolveDataToLineChart(results, fromValue, id),
                  resolveDataToPieChart(results),
                  resolveDataToBarChart(results)
               ]);
               return res.json(cache.get(`id=${id}&from_value=${fromValue}`));
            }
         );
      }
   }
});

// @route   GET api/tasks/all
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
