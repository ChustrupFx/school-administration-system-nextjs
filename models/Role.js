const { Schema, models, model, connection } = require('../database/index');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = models.Role || model('Role', schema);