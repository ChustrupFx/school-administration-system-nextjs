const { Schema, model } = require('../database/index');

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    degree: {
        type: Schema.Types.ObjectId,
        ref: 'Degree'
    },
    grade: {
        type: Schema.Types.ObjectId,
        ref: 'Grade'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = model('Task', schema);