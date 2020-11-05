// Dependencies
const config = require('config');

// Local
const Joi = require('../../lib/joi.lib');

// define schemes that are used by more than one schemes
const uuidScheme = Joi.string().guid({ version: 'uuidv4' });
const dateScheme = Joi.date().format('YYYY-MM-DD');
const pageScheme = Joi.number().min(1);
const sizeScheme = Joi.number().min(1).max(config.get('validation.maxSize'));

module.exports = {
    uuidScheme,
    dateScheme,
    pageScheme,
    sizeScheme,
};
