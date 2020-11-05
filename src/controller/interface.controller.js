// Dependencies
const errors = require('restify-errors');

// Local
const { getRestOptions } = require('../util/restOptions.helper');
const { findInterfaceById, findAllInterfaces } = require('../queries/interface.queries');

// Routes controller
// Return single interface entity
const getInterfaceById = async (req, res, next) => {
    try {
        const interfaceResult = await findInterfaceById(req.params.id);

        if (!interfaceResult) {
            return next(new errors.NotFoundError());
        }

        res.status(200);
        res.json(interfaceResult);

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Return all interface entities and page it
const getAllInterfaces = async (req, res, next) => {
    try {
        res.status(200);
        res.json(await findAllInterfaces(getRestOptions(req, true)));

        return next();
    } catch (err) {
        return next(new errors.InternalServerError());
    }
};

// Export functions
module.exports = {
    getInterfaceById,
    getAllInterfaces,
};
