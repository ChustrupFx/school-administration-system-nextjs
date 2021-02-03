const { Schema, model, models } = require('../database/index');

const schema = new Schema({
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

module.exports = models.Task || model('Task', schema);