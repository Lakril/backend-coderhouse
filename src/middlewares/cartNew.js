// export function updateProduct(product) {
//     if (product.id === idToUpdate) {
//         return {
//             ...product,
//             stock: newQuantity,
//             // Add any other properties you want to update here
//         };
//     } else {
//         return product;
//     }
// }

export function validateId(req, res, next) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product id' });
    }
    next();
    // for (let obj of products) {
    //     if (obj.code === dataProduct.code) {
    //         throw new Error('Code already exists');
    //     }
    // }
}