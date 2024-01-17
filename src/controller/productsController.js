import Product from '../dao/mongooseDB/schemas/Product.js';
import productsData from '../../database/products.json' with { type: 'json' };
import mongoose from 'mongoose';

export const controller = {
    get: async (req, res) => {
        const { limit, page, sort, filter } = req.query;

        if (limit && isNaN(Number(limit))) {
            return res.status(400).json({ message: 'Invalid limit' });
        }
        if (page && isNaN(Number(page))) {
            return res.status(400).json({ message: 'Invalid page' });
        }

        // Create a sort object
        const limitNumber = Number(limit) || 10;
        const pageNumber = Number(page) || 1;

        // Create a sort object
        //* sort=field:order - http://127.0.0.1:3001/api/products?sort=stock
        const sortObject = {};
        if (sort) {
            const sortArray = sort.split(':'); // Assume sort is in the format 'field:order'
            sortObject[sortArray[0]] = sortArray[1] === 'desc' ? -1 : 1;
        }

        // Create a filter object
        //* filter=field:value
        //* http://127.0.0.1:3001/api/products?filter=price:168
        //* http://127.0.0.1:3001/api/products?filter=category:jewelery
        const filterObject = {};
        if (filter) {
            // Assume filter is in the format 'field:value'
            const filterArray = filter.split(':');
            filterObject[filterArray[0]] = filterArray[1];
        }

        try {
            const products = await Product.paginate(filterObject, {
                limit: limitNumber,
                page: pageNumber,
                sort: sortObject,
            });

            if (!products.docs.length) {
                return res.status(404).json({ products: products.docs });
            }

            res.status(200).render('products', { products: products.docs });
            // res.json(products);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An error occurred while saving the product.' });
            }
        }
    },
    getById: async (req, res) => {
        const id = Number(req.params.pid);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const product = await Product.findById({ _id: id }).lean();
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('product', { product: product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        const product = await Product.create({
            ...req.body,
        });
        try {
            res.json({ message: 'POST' });
            await product.save();
            res.status(201).json(product.toObject());
            console.log(product);
            // res.status(201).render('product', { product });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        const id = Number(req.params.pid);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            res.json({ message: 'DELETE' });
            const product = await Product.findByIdAndDelete({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    put: async (req, res) => {
        const { title, description, code, price, stock, status, category, thumbnails } = req.body;
        const id = Number(req.params.pid);
        const product = await Product.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                code,
                price,
                stock,
                status,
                category,
                thumbnails,
            },
            { new: true, runValidators: true }
        );
        try {
            res.json({ message: 'PUT' });
            await product.save();
            res.status(201).json(product.toObject());
            console.log(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    upload: async (req, res) => {
        try {
            const newProducts = await Product.upload(productsData);
            res.status(201).json(newProducts);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    realtime: async (req, res) => {
        return res.render('realTimeProducts.handlebars', { title: 'Real Time Products' });
    },
};
