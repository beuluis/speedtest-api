// Dependencies
const Joi = require('../lib/joi.lib');

// Local
const {
    uuidScheme,
    dateScheme,
    pageScheme,
    sizeScheme,
} = require('./fields/field.schemes');

// Export validation schemes
module.exports = {
    getSpeedtestById: {
        params: Joi.object().keys({
            id: uuidScheme.required(),
        }).required(),
    },

    getAllSpeedtests: {
        query: Joi.object().keys({
            page: pageScheme.optional(),
            size: sizeScheme.optional(),
            start: dateScheme.optional(),
            end: dateScheme.optional(),
        }).optional(),
    },

    getAverageSpeedtest: {
        query: Joi.object().keys({
            start: dateScheme.optional(),
            end: dateScheme.optional(),
        }).optional(),
    },
};
