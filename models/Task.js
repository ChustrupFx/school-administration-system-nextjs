const { Schema, model, models } = require('../database/index');

const schema = new Schema({
    degree: {
        type: Schema.Types.ObjectId,
        ref: 'Degree'
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = models.Task || model('Task', schema);