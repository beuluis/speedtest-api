// config https://www.npmjs.com/package/config
module.exports = {
    serverSettings: {
        environment: 'production',
    },

    // sequelize options: https://sequelize.org/master/
    database: {
        user: 'speedtestApiProd',
        password: 'overwrite with local production config',
        database: 'speedtestApiProd',
    },
};
