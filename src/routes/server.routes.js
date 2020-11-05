// Dependencies
const Router = require('restify-router').Router;

// Local
const serverValidation = require('../validation/server.schemes');
const { validation } = require('../middleware/validation.middleware');
const serverController = require('../controller/server.controller');

// Get router instance
const routerInstance = new Router();

// Routes

// GET routes
routerInstance.get('/server/:id', validation(serverValidation.getServerById), serverController.getServerById);
routerInstance.get('/servers', validation(serverValidation.getAllServers), serverController.getAllServers);

// Export router instance
module.exports = routerInstance;
