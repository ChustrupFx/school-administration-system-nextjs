const { Schema, model, models } = require('../database/index');

const schema = new Schema({

    name: {
        type: String,
        required: true,
    },
    registrationCode: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }

}, {timestamps: true});

module.exports = models.User || model('User', schema);