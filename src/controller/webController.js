export const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        // metodo render (nombre del index.ejs)
        return res.render('register');
    },
    login: (req, res) => {
        return res.render('login');
    },
    contact: (req, res) => {
        return res.render('contact');
    },
    home: (req, res) => {
        return res.redirect('/api/login');
    },
};
