export function permit(roles) {
    return (req, res, next) => {
        if (roles.includes(req.user.rol)) return next();
        res.sendStatus(403);
    };
}

// // middleware to get token from headers Bearer
// export const getToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token || token === 'null') {
//         return res.status(403).json({
//             status: 'error',
//             message: 'There is not token',
//         });
//     }
//     // add token to request object
//     req['accessToken'] = token;
//     next();
// };

// // middleware to get token from cookies
// export function getTokenFromCookies(cookieName = 'authorization') {
//     return function (req, res, next) {
//         const token = req.signedCookies[cookieName];
//         if (!token) {
//             return res.status(403).json({
//                 status: 'error',
//                 message: 'There is not token',
//             });
//         }
//         // add token to request object
//         req['accessToken'] = token;
//         next();
//     };
// }

// export function checkRole(...roles) {
//     return (req, res, next) => {
//         if (!req.user) {
//             // if no user is logged in
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const hasRole = roles.find((role) => req.user.role === role);
//         if (!hasRole) {
//             // if logged in user has no matching role
//             return res.status(403).json({ message: 'Forbidden' });
//         }

//         next();
//     };
// }

// export function validateRequestBody(req, res, next) {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Missing fields' });
//     }
//     next();
// }
