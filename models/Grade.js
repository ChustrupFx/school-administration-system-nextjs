const { Schema, model, models } = require('../database/index');

const schema = new Schema({
    number: {
        type: Number,
        required: true,
    }
});

module.exports = models.Grade || model('Grade', schema);