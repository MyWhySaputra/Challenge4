const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/bank.account.controller')
const { CheckPostBankAccount } = require('../middleware/middleware')

router.post('/', CheckPostBankAccount, Insert)
router.get('/', Get)
router.get('/:id', GetByPK)
router.put('/:id', Update)
router.delete('/:id', Delete)


module.exports = router