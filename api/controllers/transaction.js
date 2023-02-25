
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');

const createWallet = async (userId, accountId) => {
    return await new Wallet({
        _id: new mongoose.Types.ObjectId(),
        name: "Wallet",
        amount: "0.0",
        account: accountId,
        user: userId,
        createdOn: new Date(),
        updatedOn: new Date()
    }).save()
}

const getTransactionList = (req, res, next) => {
    Transaction.find({user: req.userData.userId, account: req.params.accountId}).exec().then(docs => {
        res.status(200).json({
            name: 'List of transactions',
            data: docs
        })
    })
}

const createTransaction = async (req, res, next) => {
    const result = await Wallet.find({user: req.userData.userId, account: req.body.account})
    try {
        let walletCreated = false;
        let doc;
        if (result.length > 0) {
            doc = result[0]
        }
        else {
            doc = createWallet(req.userData.userId, req.body.account);
            walletCreated = true;
        }
        let amount = doc.amount;
        let updateAmount;
        if (req.body.transactionType === 'debit') {
            if (Number(req.body.amount) > Number(amount) || walletCreated) {
                const error = new Error('No available balance in the wallet');
                error.status = 400;
                throw error;
            }
            updateAmount = Number(amount) - Number(req.body.amount);
        }
        else {
            updateAmount = Number(amount) + Number(req.body.amount);
        }
        await Wallet.updateOne({_id: doc._id}, {$set: {amount: updateAmount.toFixed(2)}})
    }
    catch(err) {
        return next(err);
    }
    
    const trx = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        amount: req.body.amount,
        transactionType: req.body.transactionType,
        account: req.body.account,
        user: req.userData.userId,
        createdOn: new Date(),
        updatedOn: new Date()
    }).save().then(doc => {
        if (doc) {
            return res.status(201).json({
                name: 'Create a transaction',
                data: doc
            })
        }
    }).catch(err => {
        next(err);
    })
}

module.exports = {createWallet, getTransactionList, createTransaction}