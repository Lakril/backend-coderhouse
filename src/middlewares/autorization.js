export function onlyLogueadosRest(req, res, next) {
    if (!req.session['user']) {
        return res.status(403).json({
            status: 'error',
            message: 'no tenes permiso para ver esto. solo para usuarios logueados!',
        });
    }
    next();
}

export function justLoginWeb(req, res, next) {
    if (!req.session['user']) {
        return res.redirect('/login');
    }
    next();
}

export function validateRequestBody(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    next();
}
