export function justLoggedInApi(req, res, next) {
    // if (!req.session['user']) {
    if (!req.isAuthenticated()) {
        return res.status(403).json({
            status: 'error',
            message: 'you need to be logged in to access this resource',
        });
    }
    next();
}

// export function justLoggedInWeb(req, res, next) {
//     // if (!req.session['user']) {
//     if (!req.isAuthenticated()) {
//         return res.redirect('/login');
//     }
//     next();
// }

export function validateRequestBody(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    next();
}

export function permit(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;

        if (user && allowedRoles.includes(user.role)) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            res.status(403).json({ message: 'Forbidden' }); // user is forbidden
        }
    };
}
