const express = require('express');

const router = express.Router();
const verifyJwt = require('../middleware/verify-jwt');
const verifyAdmin = require('../middleware/verify-admin');

const accountTypeController = require('../controllers/account-type');

router.get('/', accountTypeController.getAccountTypeList);

router.post('/', verifyJwt, verifyAdmin, accountTypeController.createAccountType);

router.get('/:accountTypeId', accountTypeController.getAccountTypeById);

router.patch('/:accountTypeId', verifyJwt, verifyAdmin, accountTypeController.updateAccountTypeById);

router.delete('/:accountTypeId', verifyJwt, verifyAdmin, accountTypeController.deleteAccountType);

module.exports = router;
