
const { ResponseTemplate } = require('../helper/template.helper')
const Joi = require('joi');

function CheckPostUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().alphanum().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).required(),
        identity_type: Joi.string().required(),
        identity_id: Joi.string().required(),
        address: Joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}

function CheckPostBankAccount(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        bank_name: Joi.string().required(),
        bank_account_number: Joi.number().required(),
        balance: Joi.number().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}

function CheckPostTransaction(req, res, next) {
    const schema = Joi.object({
        source_account_id: Joi.number().required(),
        destination_account_id: Joi.number().required(),
        amount: Joi.number().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}


module.exports = {
    CheckPostUser,
    CheckPostBankAccount,
    CheckPostTransaction
}