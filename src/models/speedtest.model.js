const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Speedtest = sequelize.define('speedtest', {
        speedtestId: {
            // UUID
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        timestamp: {
            // timestamp
            type: DataTypes.DATE,
            allowNull: false,
        },
        jitter: {
            // ms
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        latency: {
            // float
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        downloadBandwidth: {
            // bytes // byte -> megabit = bytes / 125000
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        downloadBytes: {
            // integer
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        downloadElapsed: {
            // integer
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        uploadBandwidth: {
            // bytes // byte -> megabit = bytes / 125000
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        uploadBytes: {
            // integer
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        uploadElapsed: {
            // integer
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        packetLoss: {
            // float
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        isp: {
            // string
            type: DataTypes.STRING,
            allowNull: false,
        },
        resultId: {
            // speedtest-net result id see https://www.speedtest.net/result/c/{your id here}
            type: DataTypes.UUID,
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
        serverId: {
            // UUID
            type: DataTypes.UUID,
            references: {
                model: 'servers',
            },
        },
        interfaceId: {
            // UUID
            type: DataTypes.UUID,
            references: {
                model: 'interfaces',
            },
        },
    });

    Speedtest.associate = (models) => {
        Speedtest.belongsTo(models.Servers, { foreignKey: 'serverId' });
        Speedtest.belongsTo(models.Interfaces, { foreignKey: 'interfaceId' });
    };

    sequelizePaginate.paginate(Speedtest);

    return Speedtest;
};
