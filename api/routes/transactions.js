const express = require('express');

const router = express.Router();
const verifyJwt = require('../middleware/verify-jwt');

const transactionController = require('../controllers/transaction');

// create a transaction
router.post('/', verifyJwt, transactionController.createTransaction);

// list recent transactions based on account id
router.get('/:accountId', verifyJwt, transactionController.getTransactionList);


module.exports = router;
