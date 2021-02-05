const  { Schema, model, models, connection } = require('../database/index');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const schema = new Schema({
    name: {
        type: String,
        required: true,
    }
});
schema.plugin(autoIncrement.plugin, 'Shift');

module.exports = models.Shift || model('Shift', schema);