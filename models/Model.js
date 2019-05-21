const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Model = mongoose.model('model', ModelSchema);
