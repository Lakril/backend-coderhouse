const cart = [];
const controller = {
    get: (req, res) => {
        res.send('get');
    },
    post: (req, res) => {
        const product = req.body;
        cart.push(product);
        res.json(cart);
    },
};

module.exports = controller;
