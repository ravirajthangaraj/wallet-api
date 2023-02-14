const mongoose = require('mongoose');

const accountTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: ""},
    createdOn: Date,
})

module.exports = mongoose.model('AccountType', accountTypeSchema);
