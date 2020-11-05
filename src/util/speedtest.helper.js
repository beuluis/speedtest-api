// Dependecies
const logging = require('logging');

// Local
const { runSpeedtest } = require('../lib/speedtest.lib');
const { createServerIfNotExists } = require('../queries/server.queries');
const { createInterfaceIfNotExists } = require('../queries/interface.queries');
const { createSpeedtest } = require('../queries/speedtest.queries');

const speedtestLogger = logging.default('Speedtest');

// run speedtest and save it to db
const saveSpeedtest = async (opts) => {
    const speedtestResult = await runSpeedtest(opts);
    const speedtestServer = speedtestResult.server;
    const speedtestInterface = speedtestResult.interface;

    try {
        const serverEntity = await createServerIfNotExists(
            speedtestServer.id,
            speedtestServer.name,
            speedtestServer.location,
            speedtestServer.country,
            speedtestServer.host,
            speedtestServer.port,
            speedtestServer.ip,
        );

        const interfaceEntity = await createInterfaceIfNotExists(
            speedtestInterface.internalIp,
            speedtestInterface.name,
            speedtestInterface.macAddr,
            speedtestInterface.isVpn,
            speedtestInterface.externalIp,
        );

        const speedtestEntity = await createSpeedtest(
            speedtestResult.timestamp,
            speedtestResult.ping.jitter,
            speedtestResult.ping.latency,
            speedtestResult.download.bandwidth,
            speedtestResult.download.bytes,
            speedtestResult.download.elapsed,
            speedtestResult.upload.bandwidth,
            speedtestResult.upload.bytes,
            speedtestResult.upload.elapsed,
            speedtestResult.packetLoss,
            speedtestResult.isp,
            speedtestResult.result.id,
            serverEntity[0].serverId,
            interfaceEntity[0].interfaceId,
        );

        // reform to internal used format
        return {
            ...speedtestEntity.toJSON(),
            server: serverEntity[0].toJSON(),
            interface: interfaceEntity[0].toJSON(),
        };
    } catch (err) {
        speedtestLogger.error(err);
    }
};

module.exports = {
    saveSpeedtest,
};
