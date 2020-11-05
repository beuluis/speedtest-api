// Dependencies
const { format } = require('date-fns');
const chalk = require('chalk');
const morgan = require('morgan');

// Set morgan date token to wanted format
morgan.token('date', () => format(new Date(), 'dd.MM.yyyy HH:mm:ss:SS'));

// Define morgan log output format
module.exports = morgan((tokens, req, res) => [
    chalk.hex('#34ace0').bold(tokens.method(req, res)),
    chalk.hex('#af5fae').bold(tokens.url(req, res)),
    chalk.hex('#ffb142').bold(tokens.status(req, res)),
    chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)} ms`),
    chalk.hex('#1e90ff').bold(`@ ${tokens.date(req, res)}`),
].join(' - '));
