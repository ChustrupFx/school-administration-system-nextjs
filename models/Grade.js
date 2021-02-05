const { Schema, model, models, connection } = require('../database/index');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const schema = new Schema({
    number: {
        type: Number,
        required: true,
    }
});
schema.plugin(autoIncrement.plugin, 'Grade');

module.exports = models.Grade || model('Grade', schema);