const { Schema, model, models } = require('../database/index');
const bcrypt = require('bcrypt');

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
    },
    grade: {
        type: Number,
        required: true,
    },
    degree: {
        type: Number,
        required: true,
        max: 2
    },
    class: {
        type: String,
        required: true,
    },
    shift: {
        type: Number,
        required: true,
    }

}, {timestamps: true});

schema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = models.User || model('User', schema);