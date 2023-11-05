

// import { ProductManager } from './src/ProductManager.js';
// import path from 'path';

// const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), './database/products.json');
// console.log(filePath);

// //* test code
// const datosProduct1 = {
//   title: 'DANVOUY Womens T Shirt Casual Cotton Short',
//   price: 10,
//   description: '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
//   thumbnail: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
//   stock: 5,
//   code: 'Amtf1ydf1',
// };
// const datosProduct2 = {
//   id: 19,
//   // title: "Opna Women's Short Sleeve Moisture",
//   price: 7.95,
//   description: '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
//   thumbnail: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
//   stock: 12,
//   code: '7XPJjo',
// };
// const datosProduct3 = {
//   id: 18,
//   title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
//   price: 9.85,
//   description: '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
//   thumbnail: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
//   stock: 40,
//   code: 'Dx8E8s',
// };


// //TODO Usage
// console.log('\n-------------------------------------------');
// //! add product to ProductManager
// console.log('ADD new product');
// const ad = new ProductManager(filePath);
// await ad.addProduct(datosProduct2);
// //! end
// // console.log('\n-------------------------------------------\n');
// // ad.addProduct(datosProduct2);
// // console.log(ad.getProducts());
// // console.log('\n-------------------------------------------\n');
// // ad.addProduct(datosProduct3);
// // console.log(productManager.getProducts());
// console.log('\n-------------------------------------------');
// console.log('GET product by ID');
// const getManager = new ProductManager(filePath);
// const id = await getManager.getProductById(17);
// console.log(id);
// console.log('\n-------------------------------------------');
// console.log('GET all products');
// // const getAllProducts = await pm.getProducts();
// // console.log(getAllProducts);
// console.log('\n-------------------------------------------');
// console.log('DELETE product by ID');
// const dleteManager = new ProductManager(filePath);
// await dleteManager.deleteProduct(17);
// console.log('\n-------------------------------------------');
// console.log('UPDATE product');
// const product = {
//   title: 'Updated Product',
//   price: 8,
//   description: 'This is an updated product',
//   thumbnail: 'https://example.com/updated-product.jpg',
//   stock: 10,
//   // code: 'UPDPROD',
// };
// const updatedManager = new ProductManager(filePath);
// await updatedManager.updateProduct(18, product);
// const pp = new ProductManager(filePath);
// const up = await pp.getProductById(18);
// console.log(up);


