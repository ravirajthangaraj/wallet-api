
const mongoose = require('mongoose');
const AccountType = require('../models/account-types');
const Account = require('../models/accounts');

const getAccountsList = (req, res, next) => {
    Account.find({user: req.userData.userId}).populate('accountType', 'name').exec().then(docs => {
        res.status(200).json({name: 'List of accounts', data: docs})
    }).catch(err => {
        next(err);
    })
}

const createAccount = (req, res, next) => {
    AccountType.findById(req.body.accountType).exec().then(result => {
        if (!result) {
            const error = new Error('Account type not found');
            error.status = 400;
            throw error;
        }
        const account = Account({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            accountType: req.body.accountType,
            user: req.userData.userId || '',
            createdOn: new Date()
        })
        return account.save()
    }).then(result => {
        res.status(200).json({
            name: 'Create an account',
            data: result
        })
    }).catch(err => {
        next(err);
    })
}

const getAccountById = (req, res, next) => {
    Account.findById(req.params.accountId).populate('accountType').exec().then(doc => {
        if (!doc) {
            const error = new Error('Account not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({name: 'Detail of an account', data: doc})
    }).catch(err => {
        next(err);
    });
}

// TODO: implement updating the account
const updateAccountById = (req, res, next) => {
    res.status(200).json({
        name: 'Update an account'
    })
}

const deleteAccount = (req, res, next) => {
    Account.remove({_id: req.params.accountId}).then(result => {
        res.status(200).json({name: 'Delete an account', message: 'Deleted an account'})
    }).catch(err => {
        next(err);
    })
}

module.exports = {getAccountsList, createAccount, getAccountById, updateAccountById, deleteAccount}