// umzug wrapper
const logging = require('logging');
const path = require('path');
const Umzug = require('umzug');

const migrationLogger = logging.default('Migration');

let umzug;

const logUmzugEvent = (eventName) => (name) => {
    migrationLogger.info(`${name} ${eventName}`);
};

const setup = (sequelize) => {
    umzug = new Umzug({
        storage: 'sequelize',
        storageOptions: {
            sequelize,
        },

        migrations: {
            params: [
                sequelize.getQueryInterface(),
                sequelize.constructor,
                () => {
                    throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
                },
            ],
            path: path.join(__dirname, '../migrations'),
            pattern: /\.js$/,
        },

        logging: (log) => migrationLogger.info(log),
    });

    umzug.on('migrating', logUmzugEvent('migrating'));
    umzug.on('migrated', logUmzugEvent('migrated'));
    umzug.on('reverting', logUmzugEvent('reverting'));
    umzug.on('reverted', logUmzugEvent('reverted'));
};

const cmdStatus = () => {
    const result = {};

    return umzug.executed()
        .then((executed) => {
            result.executed = executed;
            return umzug.pending();
        }).then((pending) => {
            result.pending = pending;
            return result;
        }).then(({ executed, pending }) => {
            const tmpExecuted = executed.map((m) => {
                m.name = path.basename(m.file, '.js');
                return m;
            });

            const tmpPending = pending.map((m) => {
                m.name = path.basename(m.file, '.js');
                return m;
            });

            const current = executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
            const status = {
                current,
                executed: tmpExecuted.map((m) => m.file),
                pending: tmpPending.map((m) => m.file),
            };

            migrationLogger.info(JSON.stringify(status, null, 2));

            return { executed, pending };
        });
};

const cmdMigrate = () => umzug.up();

const cmdMigrateNext = () => cmdStatus()
    .then(({ pending }) => {
        if (pending.length === 0) {
            return Promise.reject(new Error('No pending migrations'));
        }
        const next = pending[0].name;
        return umzug.up({ to: next });
    });

const cmdReset = () => umzug.down({ to: 0 });

const cmdResetPrev = () => cmdStatus()
    .then(({ executed }) => {
        if (executed.length === 0) {
            return Promise.reject(new Error('Already at initial state'));
        }
        const prev = executed[executed.length - 1].name;
        return umzug.down({ to: prev });
    });

module.exports = {
    setup,
    cmdStatus,
    cmdMigrate,
    cmdMigrateNext,
    cmdReset,
    cmdResetPrev,
};
