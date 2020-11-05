// Local
const { models } = require('../lib/sequelize.client');

const findInterfaceById = (interfaceId) => models.Interfaces.findOne({
    where: {
        interfaceId,
    },
});

const findAllInterfaces = (restOpts) => {
    const {
        page,
        size,
        dateClause,
    } = restOpts;

    const whereClause = dateClause ? { createdAt: restOpts.dateClause } : null;

    return models.Interfaces.paginate({
        page,
        paginate: size,
        where: whereClause,
    });
};

const createInterfaceIfNotExists = (
    internalIp,
    name,
    macAddress,
    isVpn,
    externalIp,
) => models.Interfaces.findOrCreate({
    where: {
        internalIp,
        name,
        macAddress,
        isVpn,
        externalIp,
    },
    defaults: {
        internalIp,
        name,
        macAddress,
        isVpn,
        externalIp,
    },
});

module.exports = {
    findInterfaceById,
    findAllInterfaces,
    createInterfaceIfNotExists,
};
