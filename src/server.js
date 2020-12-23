// Dependencies
const config = require('config');
const corsMiddleware = require('restify-cors-middleware');
const logging = require('logging');
const restify = require('restify');

// Local
const morganLogger = require('./lib/morgan.logger');
const { connectDB } = require('./lib/sequelize.client');
const { initCron } = require('./util/cron.helper');
const { checkForDowntime } = require('./util/downtimeDetector.helper');

const downtimeRouter = require('./routes/downtime.routes');
const healthCheckRouter = require('./routes/healthcheck.routes');
const interfaceRouter = require('./routes/interface.routes');
const serverRouter = require('./routes/server.routes');
const speedtestRouter = require('./routes/speedtest.routes');
const swaggerRouter = require('./routes/swagger.routes');

// Define origin
const cors = corsMiddleware({
    origins: config.get('corsOrigins'),
});

// Initialize restify server
const server = restify.createServer();

// Initialize server logger
const serverLogger = logging.default('Server');

// Use morgan logger and cors preflight
server.pre(morganLogger);
server.pre(cors.preflight);
server.use(cors.actual);

// Use restify plugins
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Define throttle
server.use(restify.plugins.throttle(config.get('throttle')));

// Apply Routes
downtimeRouter.applyRoutes(server);
healthCheckRouter.applyRoutes(server);
interfaceRouter.applyRoutes(server);
serverRouter.applyRoutes(server);
speedtestRouter.applyRoutes(server);
swaggerRouter.applyRoutes(server);

// Listen for requests
const initServer = async () => {
    try {
        await connectDB();
    } catch (err) {
        serverLogger.info(
            'No DB connection could be established. Please check your configuration',
        );

        serverLogger.error(err);
        process.exit(1);
    }

    serverLogger.info('DB connected!');
    server.listen(config.get('serverSettings.port'), async () => {
        serverLogger.info(`${server.name} listening at ${server.url}`);

        // init and register stuff
        initCron();
        checkForDowntime();
    });
};

initServer();
