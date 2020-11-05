const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Server = sequelize.define('server', {
        serverId: {
            // UUID
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        speedtestServerId: {
            // speedtest-net internal ip
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            // string
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            // string
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            // string
            type: DataTypes.STRING,
            allowNull: false,
        },
        host: {
            // string
            type: DataTypes.STRING,
            allowNull: false,
        },
        port: {
            // port number
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ip: {
            // string, ipv4 // TODO: test ipv6
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            // timestamp
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            // timestamp
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    Server.associate = (models) => {
        Server.hasMany(models.Speedtests, { foreignKey: { name: 'serverId', onDelete: 'cascade' } });
    };

    sequelizePaginate.paginate(Server);

    return Server;
};
