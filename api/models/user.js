const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, default: ''},
    createdOn: Date
});

module.exports = mongoose.model('User', userSchema);
