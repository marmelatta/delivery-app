const {Schema, model, ObjectId, models} = require('mongoose');

const chatSchema = new Schema({
    users: {
        type: [ObjectId, ObjectId],
    },
    createAt: {
        type: Date,
    },
    /*messages: {
        type: [Message]
    },*/
})

module.exports = model('Chat', chatSchema)