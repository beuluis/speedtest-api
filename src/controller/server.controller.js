// Dependencies
const errors = require('restify-errors');

// Local
const { getRestOptions } = require('../util/restOptions.helper');

const { findServerById, findAllServers } = require('../queries/server.queries');

// Routes controller
// Return single server entity
const getServerById = async (req, res, next) => {
    try {
        const serverResult = await findServerById(req.params.id);

        if (!serverResult) {
            return next(new errors.NotFoundError());
        }

        res.status(200);
        res.json(serverResult);

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Return all server entities and page it
const getAllServers = async (req, res, next) => {
    try {
        res.status(200);
        res.json(await findAllServers(getRestOptions(req, true)));

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Export functions
module.exports = {
    getServerById,
    getAllServers,
};
