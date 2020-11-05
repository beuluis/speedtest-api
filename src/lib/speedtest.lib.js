// Dependencies
const config = require('config');
const promiseRetry = require('promise-retry');
const speedTest = require('speedtest-net');

// Run and return speedtest. See https://www.npmjs.com/package/speedtest-net for return format
const runSpeedtest = (opts) => promiseRetry(
    (retry) => speedTest({
        acceptLicense: true,
        acceptGdpr: true,
        ...opts,
    })
        .catch(retry),
    config.get('speedtestRetry'),
);

module.exports = {
    runSpeedtest,
};
