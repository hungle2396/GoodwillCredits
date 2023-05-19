

module.exports = (sequelize, DataTypes) => {
    const Permissions = sequelize.define("Permissions", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deleted_at: {
            type: DataTypes.DATE
        }
    },
    {
        underscored: true,
        paranoid: true
    });

    return Permissions;
};