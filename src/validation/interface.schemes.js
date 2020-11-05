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
    getInterfaceById: {
        params: Joi.object().keys({
            id: uuidScheme.required(),
        }).required(),
    },

    getAllInterfaces: {
        query: Joi.object().keys({
            page: pageScheme.optional(),
            size: sizeScheme.optional(),
            start: dateScheme.optional(),
            end: dateScheme.optional(),
        }).optional(),
    },
};
