// config https://www.npmjs.com/package/config
module.exports = {
    serverSettings: {
        environment: 'staging',
    },

    // sequelize options: https://sequelize.org/master/
    database: {
        user: 'speedtestApiStg',
        password: 'overwrite with local staging config',
        database: 'speedtestApiStg',
    },
};
