
module.exports = (sequelize, DataTypes) => {
    const UserEvent = sequelize.define("UserEvent", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false
        },
        event_id: {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false
        },
        host_id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: false
        }
    });

    return UserEvent;
}