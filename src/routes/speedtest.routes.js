// Dependencies
const Router = require('restify-router').Router;

// Local
const speedtestValidation = require('../validation/speedtest.schemes');
const { validation } = require('../middleware/validation.middleware');
const speedtestController = require('../controller/speedtest.controller');

// Get router instance
const routerInstance = new Router();

// Routes

// GET routes
routerInstance.get('/speedtest/:id', validation(speedtestValidation.getSpeedtestById), speedtestController.getSpeedtestById);
routerInstance.get('/speedtests', validation(speedtestValidation.getAllSpeedtests), speedtestController.getAllSpeedtests);
routerInstance.get('/speedtest/average', validation(speedtestValidation.getAverageSpeedtest), speedtestController.getAverageSpeedtest);

// POST routes
routerInstance.post('/speedtest', speedtestController.postSpeedtest);

// Export router instance
module.exports = routerInstance;
