const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK } = require('../controller/transaction.controller')
const { CheckPostTransaction } = require('../middleware/middleware')

router.post('/', CheckPostTransaction, Insert)
router.get('/', Get)
router.get('/:id', GetByPK)

module.exports = router