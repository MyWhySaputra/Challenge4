const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/bank.account.controller')
const { CheckPostBankAccount, CheckIdBankAccount } = require('../middleware/middleware')

router.post('/', CheckPostBankAccount, Insert)
router.get('/', Get)
router.get('/:id', GetByPK)
router.put('/:id', CheckIdBankAccount, Update)
router.delete('/:id', CheckIdBankAccount, Delete)


module.exports = router