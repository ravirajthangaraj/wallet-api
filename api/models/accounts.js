
const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    accountType: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountType', required: true },
    user: {type: String, default: ''},
    createdOn: Date
})

module.exports = mongoose.model('Account', accountSchema);
