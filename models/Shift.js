const { Schema, model, models } = require('../database/index');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = models.Shift || model('Shift', schema);