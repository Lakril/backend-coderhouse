import { Router } from 'express'
import { User } from '../../models/user.module.js'

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
    try {
        const dataUser = req.body
        const user = await User.create(dataUser)
        res.status(201).json({status:'success', payload: user.toObject()})
    } catch (error) {
        res.status(400).json({status:'fail', message: error.message})
    }
})
