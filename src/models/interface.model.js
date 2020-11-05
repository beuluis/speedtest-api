const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Interface = sequelize.define('interface', {
        interfaceId: {
            // UUID
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        internalIp: {
            // string, ipv4 // TODO: test ipv6
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            // string
            type: DataTypes.STRING,
            allowNull: false,
        },
        macAddress: {
            // string, mac address
            type: DataTypes.STRING,
            allowNull: false,
        },
        isVpn: {
            // boolean
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        externalIp: {
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

    Interface.associate = (models) => {
        Interface.hasMany(models.Speedtests, { foreignKey: { name: 'interfaceId', onDelete: 'cascade' } });
    };

    sequelizePaginate.paginate(Interface);

    return Interface;
};
