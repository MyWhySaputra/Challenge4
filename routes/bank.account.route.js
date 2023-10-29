const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/bank.account.controller')
const { CheckPostBankAccount, CheckIdBankAccount } = require('../middleware/middleware')

router.post('/', CheckPostBankAccount, Insert)
router.get('/', Get)
router.get('/:id', GetByPK)
router.put('/:id', CheckIdBankAccount, Update)
router.delete('/:bank_account_number', Delete)


module.exports = router