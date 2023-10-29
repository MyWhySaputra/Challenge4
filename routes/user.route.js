const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
const { CheckPostUser, CheckIdUser } = require('../middleware/middleware')

router.post('/', CheckPostUser, Insert)
router.get('/', Get)
router.get('/:id', GetByPK)
router.put('/:id', CheckIdUser, Update)
router.delete('/:id', CheckIdUser, Delete)



module.exports = router