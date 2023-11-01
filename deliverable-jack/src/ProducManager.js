// Version: 1.0
// author: Jackson Rico
import fs from 'fs/promises';
import { Product } from './Product.js';
import path from 'path';

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), '../database/products.json');

//* Class Method (2)
class ProductManager {
  #path;
  constructor(path) {
    // this.#products = JSON.parse(fs.readFileSync(path, 'utf-8')).map((p) => new Product(p));
    this.#path = path;
  }

  async addProduct(dataProduct) {
    const products = await this.getProducts()
    const product = new Product(dataProduct);
    
    // Validate that all fields are present
    if (!dataProduct.title || !dataProduct.description || !dataProduct.price || !dataProduct.code || !dataProduct.stock || !dataProduct.thumbnail) {
      throw new Error('All fields are required');
    }

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

    products.push(product.toPOJO());

    // const lastProduct = products[products.length - 1];
    // const lastProductMap = lastProduct.map(p => p.toPOJO());

    // const pp = product.toPOJO()
    await fs.writeFile(this.#path, JSON.stringify(products, null, 2));

    // const prod = products.map(p => p.asPOJO())
    return product;

  }  
  
  // GET all products
  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'));
    return products;
  }

  // GET product by ID
  async getProductById(id) {
    const products = await this.getProducts()
    const pojo = pojos.find((p) => p.id === id);
    if (!pojo) {
      console.error('Not found');
      return null;
    }
    return pojo;
  }
}

//* test code
const datosProduct1 = {
  title: 'DANVOUY Womens T Shirt Casual Cotton Short',
  price: 12.99,
  description:
    '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
  thumbnail: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  stock: 96,
  code: 'Amtf1y',
};
const datosProduct2 = {
  id: 19,
  title: "Opna Women's Short Sleeve Moisture",
  price: 7.95,
  description:
    '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
  thumbnail: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
  stock: 12,
  code: '7XPJjo',
};
const datosProduct3 = {
  id: 18,
  title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
  price: 9.85,
  description:
    '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
  thumbnail: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
  stock: 40,
  code: 'Dx8E8s',
};

//TODO create instance of ProductManager
const pm = new ProductManager(filePath);

console.log(`Empy instance of ProductManager: ${pm}\n-------------------------------------------\n`);

//! add product to ProductManager
try {
  pm.addProduct(datosProduct1);
} catch (error) {
  console.log(error.message);
}
//! end
// console.log('\n-------------------------------------------\n');

// pm.addProduct(datosProduct2);
// console.log(pm.getProducts());

// console.log('\n-------------------------------------------\n');
// pm.addProduct(datosProduct3);
// console.log(productManager.getProducts());

console.log('\n-------------------------------------------');
console.log('GET product by ID');
// try {
//   const id = await pm.getProductById(5);
//   console.log(id);
// } catch (error) {
//   console.log(error.message);
// }

console.log('\n-------------------------------------------');
console.log('GET all products');
// const getAllProducts = await pm.getProducts();
// console.log(getAllProducts);
