
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
        is_host: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return UserEvent;
}