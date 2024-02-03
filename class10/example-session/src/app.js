import express from 'express';
import cookieParser from 'cookie-parser';

import session from '../middleware/sessions';


const app = express();

// import middleware
app.use(session({ secret: 'secret'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// middleware
// const sessions = {};
// app.use((req, res, next) => {
//     let idSession
//     if (req.signedCookies.sessionId && sessions[req.signedCookies.sessionId]) {
//         idSession = req.signedCookies.sessionId;
//     } else {
//         idSession = randomBytes(16).toString('hex');
//         sessions[idSession] = {};
//         res.cookie('sessionId', idSession, {
//             // maxAge: 1000 * 60 * 60 * 24 * 7,
//             signed: true
//         });
//     }
//     req['session'] = sessions[idSession];
//     next();
// });


app.get('/', (req, res) => {
    if (!req['session']['counter']) {
        req['session']['counter'] = 1;
        res.send('Welcome');
    } else {
        req['session']['counter']++;
        res.send(`You have visited this route ${req['session']['counter']} times`);
    }
});

app.get('/logout', (req, res) => {
    req['deleteSession']();
    res.send('Logged out');
});


// app.get('/p', (req, res) => {
//     if (!req.signedCookies.sessionId) {
//         const idSession = randomBytes(16).toString('hex');
//         sessions[idSession] = {
//             counter: 1
//             // mode noche

//         };
//         // req['session'] = sessions[idSession];
//         res.cookie('sessionId', idSession, {
//             // maxAge: 1000 * 60 * 60 * 24 * 7,
//             signed: true
//         });
//         res.send('Welcome');
//     } else {
//         const mySession = sessions[req.signedCookies.sessionId];
//         mySession['counter']++;
//         res.send(`You have visited this route ${mySession['counter']} times`);
//     }
// });

// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).json({ status: 'Error in logout', body: err })
//         }
//         res.send('Logged out');
//     }); // Add closing parenthesis here
// });

app.listen(8080, () =>
    console.log(`Server started on http://localhost:8080`));