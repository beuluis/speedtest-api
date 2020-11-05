const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Downtimes = sequelize.define('downtime', {
        downtimeId: {
            // UUID
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        startDate: {
            // timestamp
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            // timestamp
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            // ms
            type: DataTypes.INTEGER,
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

    sequelizePaginate.paginate(Downtimes);

    return Downtimes;
};
