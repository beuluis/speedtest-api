// Dependencies
const Router = require('restify-router').Router;
const swaggerUi = require('swagger-ui-restify');

// Local
const swaggerDocument = require('../swagger/swagger.json');

// Get router instance
const routerInstance = new Router();

// Special routes
routerInstance.get('/swagger-ui*', ...swaggerUi.serveFiles(swaggerDocument));
routerInstance.get('/swagger', swaggerUi.setup(swaggerDocument));

// Export router instance
module.exports = routerInstance;
