// Dependencies
const { endOfDay } = require('date-fns');
const config = require('config');
const Op = require('sequelize').Op;

// get rest options
const getRestOptions = (req, pagination = false) => {
    let opts = {};

    // set page settings
    if (pagination) {
        opts = {
            page: req.query.page || config.get('defaultValues.page'),
            size: req.query.size || config.get('defaultValues.size'),
        };
    }

    // set date operator for sequelize
    if (req.query.start) {
        opts = {
            ...opts,
            dateClause: {
                [Op.gte]: new Date(req.query.start),
            },
        };
    }

    if (req.query.end) {
        opts = {
            ...opts,
            dateClause: {
                ...opts.dateClause,
                [Op.lte]: endOfDay(new Date(req.query.end)),
            },
        };
    }

    return opts;
};

module.exports = {
    getRestOptions,
};
