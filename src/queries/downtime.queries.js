// Dependencies
const Sequelize = require('sequelize');

// Local
const { models } = require('../lib/sequelize.client');

const createDowntime = (
    startDate,
    endDate,
    time,
) => models.Downtimes.create({
    startDate,
    endDate,
    time,
});

const findAllDowntimes = (restOpts) => {
    const {
        page,
        size,
        dateClause,
    } = restOpts;

    const whereClause = dateClause ? { createdAt: restOpts.dateClause } : null;

    return models.Downtimes.paginate({
        page,
        paginate: size,
        where: whereClause,
    });
};

const findDowntimeById = (downtimeId) => models.Downtimes.findOne({
    where: {
        downtimeId,
    },
});

const findAverageDowntime = (restOpts) => {
    const whereClause = restOpts.dateClause ? { createdAt: restOpts.dateClause } : null;

    return models.Downtimes.findAndCountAll({
        where: whereClause,
        attributes: [
            [Sequelize.fn('avg', Sequelize.col('time')), 'time'],
        ],
    });
};

module.exports = {
    createDowntime,
    findAllDowntimes,
    findDowntimeById,
    findAverageDowntime,
};
