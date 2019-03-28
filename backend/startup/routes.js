const express = require('express');
const tasks = require('../routes/api/tasks');
const errorMiddleware = require('../middleware/error.js');

//Middlewares and routes

module.exports = function(app) {
   app.use(express.json());
   app.use('/api/tasks', tasks.router);
   app.use(errorMiddleware);
};
