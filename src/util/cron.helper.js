// Dependencies
const config = require('config');
const CronJob = require('cron').CronJob;
const logging = require('logging');

// Local
const { saveSpeedtest } = require('./speedtest.helper');

// Initialize cron logger
const cronLogger = logging.default('Cron');

// register cron jobs
const initCron = () => {
    new CronJob(config.get('cron.speedtestCron'), () => {
        cronLogger.info('Starting speedtest Cronjob');
        saveSpeedtest();
    }).start();
};

module.exports = {
    initCron,
};
