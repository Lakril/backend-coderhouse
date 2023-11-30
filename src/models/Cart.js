import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import { ProductManager } from './ProductManager';



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
    
    async getCartById(cid) {
        try {
            const carts = await JSON.parse(await fs.readFile(this.#path, 'utf-8'));
            const findItems = carts.find((i) => i.id === cid);
            if (!findItems) {
                throw new Error(`Cart with id: ${cid} not found`);
            }
            return findItems;
        } catch (error) {
            console.log(error.message);
        }
    }
    // Get all items from cart
    async getItems(cid) {
       try {
           const items = await this.getCartById(cid);

           for (let i = 0; i < items.products.length; i++) {
            //    this.totalQuantity += carts.products[i].quantity;
            //    this.totalPrice += carts.products[i].price * carts.products[i].quantity;
            //    console.log(carts.products[i]);
            }

            console.log(items.products);

           return items;
       } catch (error) {
           console.log(error.message);
       }
   }

   // Add an item to cart
    async addItem(pid, cid, quantity, product, path) {
        try {
            // find cart in carts
            const carts = await JSON.parse(await fs.readFile(path, 'utf-8'));
            const cart = carts.getCartById(cid);
            


            if (!findItems) {
                throw new Error(`Cart with id: ${cid} not found`);
            }
            // check product in cart
            const findProduct = findItems.products.find((i) => i.id === pid);
            if (findProduct) {
                findProduct.quantity += quantity;
                return findProduct;
            } else {
                findItems.products.push({
                    id: pid,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: quantity,
                });
            }
            return findItems;
        } catch (error) {
            console.log(error.message);
        }
         
 
         const items = await this.getItems(cid);
   
    
         // check product in cart
         const findProduct = items.products.find((i) => i.id === pid);
         if (findProduct) {
            const findProductIndex = items.products.findIndex((i) => i.id === pid
                );
                items.products[findProductIndex].quantity += 1;

              findProduct.quantity += 1;
            ;
              
         } else {
              items.products.push({
                id: pid,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: quantity++,
              });
         }
         this.totalQuantity += quantity;
         this.totalPrice += product.price * quantity;
         return item;
        }
    



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
}
