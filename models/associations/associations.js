// Associations

module.exports = (db) => {
    db.permissions.hasMany(db.users);
    db.users.belongsTo(db.permissions, { foreignKey: "permission_id" });
}