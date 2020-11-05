// Dependencies
const config = require('config');
const logging = require('logging');
const promiseRetry = require('promise-retry');
const Sequelize = require('sequelize');

// Local
const { setup, cmdMigrate } = require('./sequelize.migrate');

// Setup loggers
const databaseLogger = logging.default('Database');
const migrationLogger = logging.default('Migration');

// Instance
const sequelize = new Sequelize(
    config.get('database.database'),
    config.get('database.user'),
    config.get('database.password'),
    {
        host: config.get('database.host'),
        dialect: config.get('database.dialect'),
        logging: (log) => databaseLogger.info(log),
        define: {
            charset: config.get('database.charset'),
            collate: config.get('database.collate'),
        },
        pool: config.get('database.pool'),
    },
);

// Model imports
const models = {};

models.Downtimes = require('../models/downtime.model')(sequelize, Sequelize.DataTypes);
models.Servers = require('../models/server.model')(sequelize, Sequelize.DataTypes);
models.Interfaces = require('../models/interface.model')(sequelize, Sequelize.DataTypes);
models.Speedtests = require('../models/speedtest.model')(sequelize, Sequelize.DataTypes);

const createAssociations = () => new Promise((resolve) => {
    // run associations
    Object.keys(models).forEach((modelName) => {
        if (models[modelName].hasOwnProperty.call(models[modelName], 'associate')) {
            models[modelName].associate(models);
        }
    });

    return resolve();
});

// Connect, associations, sync and migrate with retry
const connectDB = () => new Promise(async (resolve, reject) => {
    try {
        await promiseRetry(
            (retry, number) => {
                databaseLogger.info(`Trying to establish connection. Attempt ${number}`);
                return Promise.all([
                    sequelize.authenticate(),
                    createAssociations(),
                    sequelize.sync(),
                ])
                    .catch(retry);
            },
            config.get('dbRetry'),
        );

        databaseLogger.info('Connection established.');

        setup(sequelize);

        await cmdMigrate();

        migrationLogger.info('Migration complete');

        return resolve();
    } catch (err) {
        return reject(err);
    }
});

module.exports = {
    models,
    connectDB,
};
