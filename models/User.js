import {model, Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
    },
})
module.exports = model('User', userSchema);