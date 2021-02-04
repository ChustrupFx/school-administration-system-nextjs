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
        type: Schema.Types.ObjectId,
        ref: 'Grade'
    },
    degree: {
        type: Schema.Types.ObjectId,
        ref: 'Degree'
    },
    class: {
        type: String,
        required: true
    },
    shift: {
        type: Schema.Types.ObjectId,
        ref: 'Shift'
    }

}, {timestamps: true});

schema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = models.User || model('User', schema);