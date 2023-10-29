const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { name, email, password, identity_type, identity_number, address } = req.body

    const payload = {
        name,
        email,
        password,
        profile: {
            create: {
                identity_type,
                identity_number,
                address
            }
        }
    }

    try {
        
        const user = await prisma.user.create({
            data: payload,
            include: {
                profile: true
            }
        });

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp);
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
        
    }
}

async function Get(req, res) {

    const { name, email, password } = req.query

    const payload = {}

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }

    try {

        const users = await prisma.user.findMany({
            where: payload,
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            }
        });

        let resp = ResponseTemplate(users, 'success', null, 200)
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
        const users = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            }
        })

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { name, email, password } = req.body
    const { id } = req.params

    const payload = {}

    if (!name && !email && !password) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.address = password
    }


    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
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
        const user = await prisma.user.delete({
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
    Update,
    Delete
}