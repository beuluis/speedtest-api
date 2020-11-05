// Dependencies
const CronJob = require('cron').CronJob;
const logging = require('logging');

// Local
const { saveSpeedtest } = require('./speedtest.helper');

// Initialize cron logger
const cronLogger = logging.default('Cron');

// register cron jobs
// TODO: make config
const initCron = () => {
    new CronJob('*/5 * * * *', () => {
        cronLogger.info('Starting speedtest Cronjob');
        saveSpeedtest();
    }).start();
};

module.exports = {
    initCron,
};
