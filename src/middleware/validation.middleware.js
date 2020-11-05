// Dependencies
const Joi = require('../lib/joi.lib');
const { ValidationFailed } = require('../util/error.helper');

// validate against a joi scheme and replace req
const validation = (joiScheme) => async (req, res, next) => {
    try {
        const resultObj = {};

        Object.keys(joiScheme).forEach((key) => {
            if (req[key]) {
                resultObj[key] = req[key];
            }
        });

        const schemeJoiObj = Joi.object(joiScheme);
        const value = await schemeJoiObj.validateAsync(resultObj);

        Object.keys(value).forEach((key) => {
            req[key] = value[key];
        });

        return next();
    } catch (err) {
        return next(new ValidationFailed(err.message));
    }
};

module.exports = {
    validation,
};
