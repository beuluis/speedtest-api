// Dependencies
const Joi = require('@hapi/joi');
const joiDate = require('@hapi/joi-date');

// Extend joi with date
module.exports = Joi.extend(joiDate);
