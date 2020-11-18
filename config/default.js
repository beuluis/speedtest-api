// config https://www.npmjs.com/package/config
module.exports = {
    serverSettings: {
        environment: 'localhost',
        port: 80,
    },

    // Restify throttle options http://restify.com/docs/plugins-api/#throttle
    throttle: {
        burst: 5,
        rate: 1,
        ip: true,
    },

    corsOrigins: ['*'],

    // sequelize options: https://sequelize.org/master/
    database: {
        host: 'postgres',
        user: 'speedtestApiDev',
        password: 'sahjbbd74bds74',
        database: 'speedtestApiDev',
        dialect: 'postgres',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        maxRetries: 15,
        retryTimeout: 10000,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
            acquire: 10000,
            evict: 10000,
            handleDisconnects: true,
        },
    },

    // DB retry options: https://www.npmjs.com/package/retry
    dbRetry: {
        retries: 15,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 'Infinity',
        randomize: false,
    },

    // sppedtest cli retry options: https://www.npmjs.com/package/retry
    speedtestRetry: {
        retries: 15,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 'Infinity',
        randomize: false,
    },

    // Downtime detector settings
    downtimeDetector: {
        recordDowntime: true, // Save to db
        threshold: 2000, // MS threshold
    },

    // some default values
    defaultValues: {
        page: 1, // default page value
        size: 25, // default size value
    },

    // validation options
    validation: {
        maxSize: 200, // Max page size
    },

    cron: {
        speedtestCron: '*/5 * * * *',
    },
};
