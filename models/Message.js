const {Schema, model, ObjectId} = require('mongoose');

const messageSchema = new Schema({
    author: {
        type: ObjectId,
    },
    sentAt: {
        type: Date,
    },
    text: {
        type: String,
    },
    readAt: {
        type: Date,
    },
})

module.exports = model('Message', messageSchema);