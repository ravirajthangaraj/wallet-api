const mongoose = require('mongoose');
const verifyJwt = require('../middleware/verify-jwt');
const verifyAdmin = require('../middleware/verify-admin');
const AccountType = require('../models/account-types');

const getAccountTypeList = (req, res, next) => {
    AccountType.find().exec().then(docs => {
        return res.status(200).json({name: 'List of account types', data: docs})
    }).catch(err => {
        console.log(err);
        next(err);
    })
}

const createAccountType = (req, res, next) => {
    const accountType = new AccountType({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user: req.body.user || '',
        created_on: new Date()
    })
    accountType.save().then(result => {
        res.status(201).json({
            name: 'Create an account type',
            data: result
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
}

const getAccountTypeById = (req, res, next) => {
    const id = req.params.accountTypeId;
    AccountType.findById(id).exec().then(doc => {
        if (doc) return res.status(200).json({name: 'Get an account type', data: doc});

        // doc 404
        const error = new Error('Account type not found');
        error.status = 404;
        next(error);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
}

const updateAccountTypeById = (req, res, next) => {
    const id = req.params.accountTypeId;

    let updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value
    }

    AccountType.updateOne({_id: id}, {$set: updateOps}).then(result => {
        res.status(200).json({name: 'Update an account type', message: 'Updated the account type'});
    }).catch(err => {
        console.log(err);
        next(err);
    });
}

const deleteAccountType = (req, res, next) => {
    const id = req.params.accountTypeId;
    AccountType.remove({_id: id}).then(result => {
        console.log(result);
        res.status(200).json({name: 'Delete an account type', message: 'Deleted the account type'});
    }).catch(err => {
        console.log(err);
        next(err);
    })
}

module.exports = {getAccountTypeList, createAccountType, getAccountTypeById, updateAccountTypeById, deleteAccountType}