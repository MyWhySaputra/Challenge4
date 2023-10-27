const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Delete } = require('../controller/transaction.controller')
const { CheckPostTransaction } = require('../middleware/middleware')

router.post('/', CheckPostTransaction, Insert)
router.get('/', Get)
router.get('/:id', GetByPK)
router.delete('/:id', Delete)


module.exports = router