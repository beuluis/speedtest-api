// Dependencies
const errors = require('restify-errors');

// Local
const { saveSpeedtest } = require('../util/speedtest.helper');
const { getRestOptions } = require('../util/restOptions.helper');

const { findSpeedtestById, findAllSpeedtests, findAverageSpeedtest } = require('../queries/speedtest.queries');

// Routes controller
// Return single speedtest entity
const getSpeedtestById = async (req, res, next) => {
    try {
        const speedtestResult = await findSpeedtestById(req.params.id);

        if (!speedtestResult) {
            return next(new errors.NotFoundError());
        }

        res.status(200);
        res.json(speedtestResult);

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Return all speedtest entities and page it
const getAllSpeedtests = async (req, res, next) => {
    try {
        res.status(200);
        res.json(await findAllSpeedtests(getRestOptions(req, true)));

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Get average speedtest
const getAverageSpeedtest = async (req, res, next) => {
    try {
        const { count, rows } = await findAverageSpeedtest(getRestOptions(req));

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

const postSpeedtest = async (req, res, next) => {
    try {
        res.status(201);
        res.json(await saveSpeedtest());

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Export functions
module.exports = {
    getSpeedtestById,
    getAllSpeedtests,
    getAverageSpeedtest,
    postSpeedtest,
};
