const { Schema, models, model, connection } = require('../database/index');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});
schema.plugin(autoIncrement.plugin, 'Role');

module.exports = models.Role || model('Role', schema);