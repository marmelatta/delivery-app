/*import {model, Schema} from "mongoose";

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
module.exports = model('User', userSchema);*/

const records = [
    {
        id: 1,
        username: 'jack',
        password: 'secret',
        displayName: 'Jack',
        emails: [{ value: 'jack@example.com' }],
    },
    {
        id: 2,
        username: 'jill',
        password: 'birthday',
        displayName: 'Jill',
        emails: [{ value: 'jill@example.com' }],
    },
]

exports.findById = function (id, cb) {
    process.nextTick(function () {
        const idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    })
}

exports.findByUsername = function (username, cb) {
    process.nextTick(function () {
        let i = 0, len = records.length;
        for (; i <len; i++) {
            const record = records[i];
            if (record.username === username) {
                return cb(null, record)
            }
        }
        return cb(null, null);
    })
}

exports.verifyPassword = (userSchema,  password) => {
    return userSchema.password === password;
}