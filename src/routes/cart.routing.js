import { Router } from 'express';
import { controller } from '../controller/cartController.js';

export const CartRouter = Router();

CartRouter.get('/api/carts/products', controller.get);
CartRouter.post('/api/carts/:id', controller.post);

// // Step 1: Define a function that updates a product if its id matches the id of the product to update
// export function updateProduct(product) {
//     if (product.id === idToUpdate) {
//         return {
//             ...product,
//             quantity: newQuantity,
//             // Add any other properties you want to update here
//         };
//     } else {
//         return product;
//     }
// }

// // Step 2: Use the map() method to create a new array where the specified product has been updated
// const updatedCart = cart.map(updateProduct);

// // Step 1: Define a function that calculates the total price
// function calculateTotal(total, product) {
//     return total + product.price * product.quantity;
// }

// // Step 2: Use the reduce() method to calculate the total price of all items in the cart
// const totalPrice = cart.reduce(calculateTotal, 0);
