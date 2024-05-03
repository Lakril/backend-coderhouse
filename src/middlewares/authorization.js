// middleware to get token from headers
export const getToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token || token === 'null') {
        return res.status(403).json({
            status: 'error',
            message: 'There is not token',
        });
    }
    // add token to request object
    req['accessToken'] = token;
    next();
};

export function checkRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            // if no user is logged in
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const hasRole = roles.find((role) => req.user.role === role);
        if (!hasRole) {
            // if logged in user has no matching role
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
}

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
            // role is allowed, so continue on the next middleware
            next();
        } else {
            // user is forbidden
            res.status(403).json({ message: 'Forbidden' });
        }
    };
}

// export const authenticateToken = (req, res, next) => {
//     const authHeader = req.header['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'Acceso denegado' });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ error: 'Token no es válido' });
//         req.user = user;
//         next();
//     });
// };
