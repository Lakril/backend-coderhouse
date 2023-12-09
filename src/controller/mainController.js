export const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        // metodo render (nombre del index.ejs)
        return res.render('register');
    },
    login: (req, res) => {
        return res.send('login');
    },
    contact: (req, res) => {
        return res.send('contact');
    }	
};

// export default controller;
