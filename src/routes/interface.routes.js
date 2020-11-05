// Dependencies
const Router = require('restify-router').Router;

// Local
const interfaceValidation = require('../validation/interface.schemes');
const { validation } = require('../middleware/validation.middleware');
const interfaceController = require('../controller/interface.controller');

// Get router instance
const routerInstance = new Router();

// Routes

// GET routes
routerInstance.get('/interface/:id', validation(interfaceValidation.getInterfaceById), interfaceController.getInterfaceById);
routerInstance.get('/interfaces', validation(interfaceValidation.getAllInterfaces), interfaceController.getAllInterfaces);

// Export router instance
module.exports = routerInstance;
