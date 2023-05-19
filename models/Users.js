

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
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
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false
        },
        google_id: {
            type: DataTypes.STRING
        },
        registration_type: {
            type: DataTypes.ENUM('google', 'email'),
            allowNull: false
        },
        idAdmin: {
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

    return Users;
};