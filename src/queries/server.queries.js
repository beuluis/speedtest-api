// Local
const { models } = require('../lib/sequelize.client');

const findServerById = (serverId) => models.Servers.findOne({
    where: {
        serverId,
    },
});

const findAllServers = (restOpts) => {
    const {
        page,
        size,
        dateClause,
    } = restOpts;

    const whereClause = dateClause ? { createdAt: restOpts.dateClause } : null;

    return models.Servers.paginate({
        page,
        paginate: size,
        where: whereClause,
    });
};

const createServerIfNotExists = (
    speedtestServerId,
    name,
    location,
    country,
    host,
    port,
    ip,
) => models.Servers.findOrCreate({
    where: {
        speedtestServerId,
        name,
        location,
        country,
        host,
        port,
        ip,
    },
    defaults: {
        speedtestServerId,
        name,
        location,
        country,
        host,
        port,
        ip,
    },
});

module.exports = {
    findServerById,
    findAllServers,
    createServerIfNotExists,
};
