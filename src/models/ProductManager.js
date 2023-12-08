import fs from 'fs/promises';
import { Product } from './Product.js';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//* Class Method
export class ProductManager {
    #path;
    constructor(path) {
        this.#path = path;
    }

    validateFields(dataProduct) {
        const fieldsNumber = ['price', 'stock'];
        const fieldsString = ['title', 'code', 'category'];
        const allFields = fieldsNumber.concat(fieldsString);
        const errors = [];

        for (const field of allFields) {
            if (dataProduct[field] === undefined) {
                errors.push(`${capitalizeFirstLetter(field)} must not be undefined`);
            }
        }

        for (const field of fieldsNumber) {
            if ((typeof dataProduct[field] !== 'number') & dataProduct[field]) {
                errors.push(`${capitalizeFirstLetter(field)} must be a number`);
            } else if (dataProduct[field] <= 0) {
                errors.push(`${capitalizeFirstLetter(field)} must be a number greater than 0`);
            }
        }
        for (const field of fieldsString) {
            if ((typeof dataProduct[field] !== 'string') & dataProduct[field]) {
                errors.push(`${capitalizeFirstLetter(field)} must be a string`);
            }
        }

        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
    }

    async addProduct(dataProduct) {
        let products = await this.getProducts();
        const product = new Product(dataProduct);
        try {
            // Validate that all fields are present
            await this.validateFields(dataProduct);

            // Validate that the code field is unique
            for (let obj of products) {
                if (obj.code === dataProduct.code) {
                    throw new Error('Code already exists');
                }
            }

            // increment the id
            let maxId = 0;
            for (let product of products) {
                if (product.id > maxId) {
                    maxId = product.id;
                }
            }
            product.id = maxId + 1;

            // Convert the Product instance to a plain JavaScript object
            const productPOJO = product.toPOJO();

            // add product to products
            products.push(productPOJO);

            // Write the updated array back to the JSON file
            await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
            console.log(`Add new product with ID:${product.id}`);
        } catch (error) {
            console.log(error.message);
        }
        return product;
    }

    // GET all products
    async getProducts({ limit = 0 } = {}) {
        const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'));
        if (limit > 0) {
            return products.slice(0, limit);
        } else {
            return products;
        }
    }

    // GET product by ID
    async getProductById(id) {
        // Validate the id
        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('Invalid id');
        }

        const products = await this.getProducts();
        const pojo = products.find((p) => p.id === id);
        if (!pojo) {
            console.error(`Product with ID ${id} does not exist`);
            return null;
        }
        return pojo;
    }

    //deleteProduct(id) {}
    async deleteProduct(id) {
        try {
            // Validate the id
            if (typeof id !== 'number' || isNaN(id)) {
                throw new Error('Invalid id');
            }

            // Parse the file's contents to a JavaScript array
            const data = await this.getProducts();

            // Filter out the product with the given ID
            const products = data.filter((product) => product.id !== id);

            // Check if a product was deleted
            if (data.length === products.length) {
                throw new Error(`Product with ID ${id} does not exist`);
            } else {
                // Write the updated array back to the JSON file
                await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
                console.log(`Product with ID ${id} was deleted`);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // update products
    async updateProduct(productId, updatedProductData) {
        const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'));

        try {
            if (typeof productId !== 'number' || !productId) {
                throw new Error(`The Id must be a number`);
            }

            // validate fields
            await this.validateFields(updatedProductData);

            //search id in products
            const idIndex = products.findIndex((u) => u.id === productId);
            // const product = products.find((p) => p.id === productId);

            if (idIndex === -1) {
                throw new Error(`Product with ID ${productId} not found`);
            }

            // update product
            const product = products[idIndex];
            const updatedProduct = { ...product, ...updatedProductData };
            products[idIndex] = updatedProduct;

            await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
            console.log(`Product with ID ${productId} updated`);
        } catch (error) {
            console.log(error.message);
        }
    }
}

//& ------------------------------------DONE------------------------------------
