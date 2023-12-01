import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import { ProductManager } from '../models/ProductManager.js';

export class Cart {
    #path;
    constructor(path) {
        this.#path = path;
        this.items = [];
        this.cid = randomUUID();
    }
    // Create a new cart
    async newCart() {
        const carts = await JSON.parse(await fs.readFile(this.#path, 'utf-8'));
        let cartObject = {
            id: this.cid,
            products: this.items,
        };
        try {
            carts.push(cartObject);
            await fs.writeFile(this.#path, JSON.stringify(carts, null, 2));
            console.log(`New cart created with id: ${this.cid}`);
            return this.cid;
        } catch (error) {
            console.log(error.message);
        }
    }
    // Get all items from cart
    async getItems(cid) {
        try {
            const carts = await JSON.parse(await fs.readFile(this.#path, 'utf-8'));
            const findCart = carts.find((i) => i.id === cid);
            if (!findCart) {
                throw new Error(`Cart with id: ${cid} not found`);
            }
            return findCart.products;
        } catch (error) {
            console.log(error.message);
        }
    }

    // Add an item to cart
    async addItem(pid, cid, quantity=1, products) {
        try {
            const pm = new ProductManager(products);
            let carts = await JSON.parse(await fs.readFile(this.#path, 'utf-8'));
            let product = await pm.getProductById(pid);

            // Find the cart
            const cart = await this.getItems(cid);

            // Find the proCart in the cart
            const item = cart.find((p) => p.id === pid);
            console.log(item);

            // if (item.quantity > product.stock) {
            //     throw new Error(`Quantity ${quantity} exceeds stock ${product.stock}`);
            // }

            // updated item quantity in the cart
            if (item) {
                // update quantity
                item.quantity += quantity;
        
                // Update the cart
                carts = carts.map((c) => {
                    if (c.id === cid) {
                        c.products = c.products.map((p) => {
                            if (p.id === pid) {
                                p.quantity = p.quantity + quantity;
                            }
                            return p;
                        });
                    }
                    return c;
                });

                await fs.writeFile(this.#path, JSON.stringify(carts, null, 2));
                return item;
            } else {
                // create new item
                const item = {
                    id: pid,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnails,
                    quantity: quantity,
                };
                carts = carts.map((c) => {
                    if (c.id === cid) {
                        c.products.push(item);
                    }
                    return c;
                });

                await fs.writeFile(this.#path, JSON.stringify(carts, null, 2));
                console.log(carts);
                return item;
            }
        } catch (error) {
            console.log(error.message);
        }

        

    }
}

        // saveCarts(carts);
    //     async function saveCarts(carts) {
    //         try {
    //           await fs.writeFile('carts.json', JSON.stringify(carts, null, 2));
    //         } catch (err) {
    //           console.error('Error writing file', err);
    //         }
    //       }
    // }


    // Post an item to cart
    // async addItem(pid, cid, quantity, pathProducts) {
    //     await this.newCart(this.path);
    //     const pm = new ProductManager(pathProducts);
    //     const product = await pm.getProductById(pid);
    //     const item = await this.getCartById(cid);

    //     // check product in cart
    //     const findProduct = item.products.find((i) => i.id === pid);
    //     if (findProduct) {
    //         findProduct.quantity += quantity;
    //     } else {
    //         item.products.push({
    //             id: pid,
    //             title: product.title,
    //             price: product.price,
    //             thumbnail: product.thumbnail,
    //             quantity: quantity,
    //         });
    //     }
    //     this.totalQuantity += quantity;
    //     this.totalPrice += product.price * quantity;
    //     await this.newCart(this.path);
    //     return item;

    // }
    // delete an item from cart
    // async deleteItem(pid, cid, pathProducts) {
    //     const pm = new ProductManager(pathProducts);
    //     const product = await pm.getProductById(pid);
    //     const item = await this.getCartById(cid);

    //     // check product in cart
    //     const findProduct = item.products.find((i) => i.id === pid);
    //     if (findProduct) {
    //         findProduct.quantity -= 1;
    //     } else {
    //         throw new Error(`Product with id: ${pid} not found`);
    //     }
    //     this.totalQuantity -= 1;
    //     this.totalPrice -= product.price;
    //     await this.newCart(this.path);
    //     return item;
    // }

    // Update an item in cart
    // async updateItem(pid, cid, quantity, pathProducts) {
    //     const pm = new ProductManager(pathProducts);
    //     const product = await pm.getProductById(pid);
    //     const item = await this.getCartById(cid);

    //     // check product in cart
    //     const findProduct = item.products.find((i) => i.id === pid);
    //     if (findProduct) {
    //         findProduct.quantity = quantity;
    //     } else {
    //         throw new Error(`Product with id: ${pid} not found`);
    //     }
    //     this.totalQuantity = 0;
    //     this.totalPrice = 0;
    //     await this.newCart(this.path);
    //     return item;
    // }


// check product in cart
// const findProduct = items.products.find((i) => i.id === pid);
// if (findProduct) {
//    const findProductIndex = items.products.findIndex((i) => i.id === pid
//        );
//        items.products[findProductIndex].quantity += 1;

//      findProduct.quantity += 1;
//    ;

// } else {
//      items.products.push({
//        id: pid,
//        title: product.title,
//        price: product.price,
//        thumbnail: product.thumbnail,
//        quantity: quantity++,
//      });
// }
// this.totalQuantity += quantity;
// this.totalPrice += product.price * quantity;
// return item;