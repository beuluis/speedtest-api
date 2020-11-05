const config = require('config');
const isOnline = require('is-online');
const logging = require('logging');

const { createDowntime } = require('../queries/downtime.queries');

// Initialize downtime logger
const downtimeDetectorLogger = logging.default('DowntimeDetector');

let downtimeStartDate;

// check if there is internet and call itself after to run again
const checkForDowntime = async () => {
    if (config.get('downtimeDetector.recordDowntime')) {
        const onlineState = await isOnline();

        if (onlineState) {
            if (downtimeStartDate) {
                const downtimeEndDate = new Date();
                const ms = downtimeEndDate.getTime() - downtimeStartDate.getTime();

                if (ms >= config.get('downtimeDetector.threshold')) {
                    downtimeDetectorLogger.info(`Downtime recorded: ${ms}ms`);
                    await createDowntime(downtimeStartDate, downtimeEndDate, ms);
                } else {
                    downtimeDetectorLogger.info(`Downtime (to low for threshold): ${ms}ms`);
                }
                downtimeStartDate = null;
            }
            return checkForDowntime();
        }

        if (!downtimeStartDate) {
            downtimeDetectorLogger.warn('Network is down');
            downtimeStartDate = new Date();
        }

        return checkForDowntime();
    }
};

module.exports = {
    checkForDowntime,
};
