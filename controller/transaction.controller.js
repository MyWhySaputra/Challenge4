const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { source_account_id, destination_account_id, amount } = req.body

    const payload = {
        source_account_id,
        destination_account_id,
        amount
    }

    try {
        // const sender = payload.source_account_id
        // const receiver = payload.destination_account_id

        // const balance = await prisma.bank_accounts.update({
        //     where: {
        //         id: Number(sender)
        //     },
        //     data: {
        //         balance: -payload.amount
        //     }
        // })

        // const balance2 = await prisma.bank_accounts.update({
        //     where: {
        //         id: Number(receiver)
        //     },
        //     data: {
        //         balance: +payload.amount
        //     }
        // })

        const transaction = await prisma.transactions.create({
            data: payload
        })

        let resp = ResponseTemplate(transaction, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { source_account_id, destination_account_id, amount  } = req.query

    const payload = {}

    if (source_account_id) {
        payload.source_account_id = source_account_id
    }

    if (destination_account_id) {
        payload.destination_account_id = destination_account_id
    }

    if (amount) {
        payload.amount = amount
    }

    try {

        const transaction = await prisma.transactions.findMany({
            where: payload
        });

        let resp = ResponseTemplate(transaction, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function GetByPK(req, res) {

    const { id } = req.params

    try {
        const transaction = await prisma.transactions.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                bank_account_source: true,
                bank_account_destination: true
            }
        })

        let resp = ResponseTemplate(transaction, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { id } = req.params

    try {
        await prisma.transactions.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}


module.exports = {
    Insert,
    Get,
    GetByPK,
    Delete
}