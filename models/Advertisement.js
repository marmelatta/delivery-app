const {Schema, model} = require('mongoose');

const advertisementSchema = new Schema({
    shortText: {
        type: String,
    },
    description: {
        type: String,
    },
})
module.exports = model('advertisement', advertisementSchema);