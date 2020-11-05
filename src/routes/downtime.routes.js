// Dependencies
const Router = require('restify-router').Router;

// Local
const downtimeValidation = require('../validation/downtime.schemes');
const { validation } = require('../middleware/validation.middleware');
const downtimeController = require('../controller/downtime.controller');

// Get router instance
const routerInstance = new Router();

// Routes

// GET routes
routerInstance.get('/downtime/:id', validation(downtimeValidation.getDowntimeById), downtimeController.getDowntimeById);
routerInstance.get('/downtimes', validation(downtimeValidation.getAllDowntimes), downtimeController.getAllDowntimes);
routerInstance.get('/downtime/average', validation(downtimeValidation.getAverageDowntime), downtimeController.getAverageDowntime);

// Export router instance
module.exports = routerInstance;
