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
    }

}, {timestamps: true});

schema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = models.User || model('User', schema);