import { Router } from 'express'
import { justLoginWeb } from '../../middlewares/autorizacion.js'

export const webRouter = Router()

/* 
CASO DE USO:
regiter
login
consult my profile
logout
*/

webRouter.get('/', (req, res) => {
    res.redirect('/profile')
})

webRouter.get('/register', (req, res) => {
    res.render('register.hbs', { pageTitle: 'Register' })
})
webRouter.get('/login', (req, res) => {
    res.render('login.hbs', { pageTitle: 'Login' })
})

function justLoginRest(req, res, next) {
    if (!req.session['user']) {
        return res.status(403).json({
            status: 'fail',
            message: 'you dont have permission to access this resource',
        })
    }
    next()
}

// function justLoginWeb(req, res, next) {
//     if (!req.session['user']) {
//         return res.redirect('/login')
//     }
//     next()
// }

webRouter.get('/profile', justLoginWeb, (req, res) => {
    res.render('profile.hbs', {
        pageTitle: 'Profile',
        ...req.session['user'],
    })
})
