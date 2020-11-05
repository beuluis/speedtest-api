// Dependencies
const Sequelize = require('sequelize');

// Local
const { models } = require('../lib/sequelize.client');

const createSpeedtest = (
    timestamp,
    jitter,
    latency,
    downloadBandwidth,
    downloadBytes,
    downloadElapsed,
    uploadBandwidth,
    uploadBytes,
    uploadElapsed,
    packetLoss,
    isp,
    resultId,
    serverId,
    interfaceId,
) => models.Speedtests.create({
    timestamp,
    jitter,
    latency,
    downloadBandwidth,
    downloadBytes,
    downloadElapsed,
    uploadBandwidth,
    uploadBytes,
    uploadElapsed,
    packetLoss,
    isp,
    resultId,
    serverId,
    interfaceId,
});

const findAllSpeedtests = (restOpts) => {
    const {
        page,
        size,
        dateClause,
    } = restOpts;

    const whereClause = dateClause ? { timestamp: restOpts.dateClause } : null;

    return models.Speedtests.paginate({
        page,
        paginate: size,
        where: whereClause,
    });
};

const findSpeedtestById = (speedtestId) => models.Speedtests.findOne({
    where: {
        speedtestId,
    },
});

const findAverageSpeedtest = (restOpts) => {
    const whereClause = restOpts.dateClause ? { timestamp: restOpts.dateClause } : null;

    return models.Speedtests.findAndCountAll({
        where: whereClause,
        attributes: [
            [Sequelize.fn('avg', Sequelize.col('jitter')), 'jitter'],
            [Sequelize.fn('avg', Sequelize.col('latency')), 'latency'],
            [Sequelize.fn('avg', Sequelize.col('downloadBandwidth')), 'downloadBandwidth'],
            [Sequelize.fn('avg', Sequelize.col('downloadBytes')), 'downloadBytes'],
            [Sequelize.fn('avg', Sequelize.col('downloadElapsed')), 'downloadElapsed'],
            [Sequelize.fn('avg', Sequelize.col('uploadBandwidth')), 'uploadBandwidth'],
            [Sequelize.fn('avg', Sequelize.col('uploadBytes')), 'uploadBytes'],
            [Sequelize.fn('avg', Sequelize.col('uploadElapsed')), 'uploadElapsed'],
            [Sequelize.fn('avg', Sequelize.col('packetLoss')), 'packetLoss'],
        ],
    });
};

module.exports = {
    createSpeedtest,
    findAllSpeedtests,
    findSpeedtestById,
    findAverageSpeedtest,
};
