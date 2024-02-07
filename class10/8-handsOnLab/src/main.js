import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'

import { MONGODB_CNX_STR, PORT } from './config.js'
import { apiRouter } from './routers/api/apirest.router.js'
import { webRouter } from './routers/web/web.router.js'
import { sessions } from './middlewares/sessions.js'

await mongoose.connect(MONGODB_CNX_STR)
console.log(`conectado a ${MONGODB_CNX_STR}`)

export const app = express()

app.engine('.hbs', engine({ extname: '.hbs' }))

app.set('view engine', '.hbs')

app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
)

app.use('/static', express.static('./static'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(sessions)

app.use('/', webRouter)
app.use('/api', apiRouter)
