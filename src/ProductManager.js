// Version: 1.0
// author: Jackson Rico
import fs from 'fs/promises';
import { Product } from './Product.js';
import path from 'path';

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), '../database/products.json');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//* Class Method (2)
export class ProductManager {
  #path;
  constructor(path) {
    // this.#products = JSON.parse(fs.readFileSync(path, 'utf-8')).map((p) => new Product(p));
    this.#path = path;
  }

  validateFields(dataProduct) {
    const fieldsNumber = ['price', 'stock'];
    const fieldsString = ['title', 'code'];
    const errors = [];

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

      // await fs.writeFile(this.#path, JSON.stringify(products.map(p => p.toPOJO()), null, 2));
      await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
      console.log(`Add new product with ID:${product.id}`);
    } catch (error) {
      console.log(error.message);
    }
    return product;
  }

  // GET all products
  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'));
    return products;
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
    const products = await this.getProducts();

    try {
      if (typeof productId !== 'number' || !productId) {
        throw new Error(`The Id must be a number`);
      }

      // validate fields
      await this.validateFields(updatedProductData);

      //search id in products
      const product = products.find((p) => p.id === Number(productId));
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      // Update the product data
      for (let key in updatedProductData) {
        if (product.hasOwnProperty(key)) {
          product[key] = updatedProductData[key];
        }
      }
      await fs.writeFile(filePath, JSON.stringify(products, null, 2));
      console.log(`Product with ID ${productId} updated`);
    } catch (error) {
      console.log(error.message);
    }
  }
}

//* test code
const datosProduct1 = {
  title: 'DANVOUY Womens T Shirt Casual Cotton Short',
  price: 10,
  description:
    '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
  thumbnail: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
  stock: 5,
  code: 'Amtf1ydf123',
};
const datosProduct2 = {
  id: 19,
  // title: "Opna Women's Short Sleeve Moisture",
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

//TODO Usage
console.log('\n-------------------------------------------');
//! add product to ProductManager
console.log('ADD new product');
const ad = new ProductManager(filePath);
await ad.addProduct(datosProduct1);

//! end
// console.log('\n-------------------------------------------\n');

// ad.addProduct(datosProduct2);
// console.log(ad.getProducts());

// console.log('\n-------------------------------------------\n');
// ad.addProduct(datosProduct3);
// console.log(productManager.getProducts());

console.log('\n-------------------------------------------');
console.log('GET product by ID');
const getManager = new ProductManager(filePath);
const id = await getManager.getProductById(17);
console.log(id);

console.log('\n-------------------------------------------');
console.log('GET all products');
// const getAllProducts = await pm.getProducts();
// console.log(getAllProducts);

console.log('\n-------------------------------------------');
console.log('DELETE product by ID');
const dleteManager = new ProductManager(filePath);
await dleteManager.deleteProduct(17);

console.log('\n-------------------------------------------');
console.log('UPDATE product');

const product = {
  title: 'Updated Product',
  price: 8,
  description: 'This is an updated product',
  thumbnail: 'https://example.com/updated-product.jpg',
  stock: 10,
  // code: 'UPDPROD',
};

const updatedManager = new ProductManager(filePath);
await updatedManager.updateProduct(18, product);

const pp = new ProductManager(filePath);
const up = await pp.getProductById(18);
console.log(up);
