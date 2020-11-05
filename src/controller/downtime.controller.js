// Dependencies
const errors = require('restify-errors');

// Local
const { getRestOptions } = require('../util/restOptions.helper');
const { findDowntimeById, findAllDowntimes, findAverageDowntime } = require('../queries/downtime.queries');

// Routes controller
// Return single downtime entity
const getDowntimeById = async (req, res, next) => {
    try {
        const downtimeResult = await findDowntimeById(req.params.id);

        if (!downtimeResult) {
            return next(new errors.NotFoundError());
        }

        res.status(200);
        res.json(downtimeResult);

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Return all downtime entities and page it
const getAllDowntimes = async (req, res, next) => {
    try {
        res.status(200);
        res.json(await findAllDowntimes(getRestOptions(req, true)));

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Get average downtime
const getAverageDowntime = async (req, res, next) => {
    try {
        const { count, rows } = await findAverageDowntime(getRestOptions(req));

        res.status(200);

        if (!rows[0]) {
            res.json({});
        }

        res.json({
            count,
            ...rows[0].toJSON(),
        });

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Export functions
module.exports = {
    getDowntimeById,
    getAllDowntimes,
    getAverageDowntime,
};
