const express = require('express');

const router = express.Router();

const verifyJwt = require('../middleware/verify-jwt');

const accountController = require('../controllers/account');

router.get('/', verifyJwt, accountController.getAccountsList);

router.post('/', verifyJwt, accountController.createAccount);

router.get('/:accountId', verifyJwt, accountController.getAccountById);

// TODO: implement updating the account
router.patch('/:accountId', verifyJwt, accountController.updateAccountById);

router.delete('/:accountId', verifyJwt, accountController.deleteAccount);

module.exports = router;
