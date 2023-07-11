const Event = require("./Event");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
        },
        google_id: {
            type: DataTypes.STRING
        },
        registration_type: {
            type: DataTypes.ENUM('google', 'email'),
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        updated_at: {
            type: DataTypes.DATE
        },
        created_at: {
            type: DataTypes.DATE
        }
    },
    {
        underscored: true,
        paranoid: true,
        hooks: {
            beforeValidate: (user) => {
                if (user.registration_type === "google") {
                    user.username = null;
                    user.password = null;
                }
            }
        }
    });

    return User;
};