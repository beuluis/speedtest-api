// Dependencies
const Router = require('restify-router').Router;

// Local
const healthCheckController = require('../controller/healthcheck.controller');

// Get router instance
const routerInstance = new Router();

// Routes

// GET routes
routerInstance.get('/healthcheck', healthCheckController.getHealthCheck);

// Export router instance
module.exports = routerInstance;
