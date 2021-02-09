const { model, models, Schema } = require('../database/index');

const schema = new Schema({
    degree: {
        type: Schema.Types.ObjectId,
        ref: 'Degree',
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = models.Content || model('Content', schema);