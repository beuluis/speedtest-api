// Dependencies
const errors = require('restify-errors');

// Custom errors
const ValidationFailed = errors.makeConstructor('ValidationFailed', {
    statusCode: 400,
    code: 'ValidationFailed',
    message: 'The validation failed',
});

module.exports = {
    ValidationFailed,
};
