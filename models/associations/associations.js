// Associations

module.exports = (db) => {

    // ** USER and EVENT **
    // A user can be a host of many events
    // An event can only have to host
    // one to many relationship
    db.User.hasMany(db.Event, { foreignKey: 'host_id' });
    db.Event.belongsTo(db.User, { foreignKey: 'host_id' });

    // ** USER | USEREVENT | EVENT
    // A user can have many events
    // An event can have many users in it
    // many to many relationship
    db.User.belongsToMany(db.Event, { through: db.UserEvent, foreignKey: 'user_id' });
    db.Event.belongsToMany(db.User, { through: db.UserEvent, foreignKey: 'event_id' });
}