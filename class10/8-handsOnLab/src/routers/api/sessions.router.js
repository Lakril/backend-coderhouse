import { Router } from 'express'
import { User } from '../../models/user.module.js'
import { ADMIN_EMAIL } from '../../config.js'

export const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
    const user = await User.findOne(req.body)
    if (!user) {
        return res.status(401).json({ message: 'unauthorized' })
    }
    req.session['user'] = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
    }
    if (user.email === ADMIN_EMAIL) {
        req.session['user'].role = 'admin'
    } else {
        req.session['user'].role = 'user'
    }
    res.status(201).json({ status: 'success', payload: req.session['user'] })
})

sessionsRouter.delete('/current', async (req, res) => {
    req.session.destroy(() => {
        res.status(204).end()
    })
})
