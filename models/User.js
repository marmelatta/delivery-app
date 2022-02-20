const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
    },
    passwordHash: {
        type: String,
    },
    name: {
        type: String,
    },
    contactPhone: {
        type: String,
    },
})
module.exports = model('User', userSchema);

exports.findByUsername = function (email, cb) {
    process.nextTick(async function () {
        let user = await userSchema.findOne({email: email}).exec();
            if (user) {
                return cb(null, user)
            }
        return cb(null, null);
    })
}