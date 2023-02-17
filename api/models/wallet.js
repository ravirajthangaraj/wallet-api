const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    amount: {type: String, required: true},
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdOn: Date,
    updatedOn: Date
});

module.exports = mongoose.model('Wallet', walletSchema);
