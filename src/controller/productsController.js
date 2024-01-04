import Product from '../dao/schemas/Product.js';

export const controller = {
    get: async (req, res) => {
        const { limit } = req.query;
        try {
            const products = await Product.find().limit(Number(limit)).lean();
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }
            res.render('products', { products });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        const id = Number(req.params.pid);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const product = await Product.find({id:id});
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        // res.json({ message: 'POST' });
        const { title, description, code, price, stock, status, category, thumbnails } = req.body;
        // console.log(req.body)

        try {
            const create = await Product.create({
                title,
                description,
                code,
                price,
                stock,
                status,
                category,
                thumbnails,
            });
            console.log(create)
            await create.save();
            res.status(201).json(create.toObject());
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

// const producto = [
//     {
//         title: 'Producto 1',
//         price: 100,
//         thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png',
//         id: 1,
//     },
//     {
//         title: 'Producto 2',
//         price: 200,
//         thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-256.png',
//         id: 2,
//     },
// ];

// const createProduct = async (req, res) => {
//     const { title, price, thumbnail } = req.body;
//     try {
//         const newProduct = new Product({ title, price, thumbnail });
//         await newProduct.save();
//         res.json(newProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         if (!products.length) {
//             return res.status(404).json({ message: 'No products found' });
//         }
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const getProductById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const product = await Product.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
