const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/account.controller')
const { CheckPostUser } = require('../middleware/middleware')

router.post('/', Insert)
router.get('/', Get)
router.get('/:id', GetByPK)
router.put('/:id', Update)
router.delete('/:id', Delete)


module.exports = router