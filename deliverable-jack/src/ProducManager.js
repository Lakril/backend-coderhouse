// Version: 1.0
// author: Jackson Rico

import { Product } from "./Product";


//* Class Method (2)
class ProductManager {
  #nextId = 1;
  #products;
  constructor() {
    this.#products = [];
  }

  addProduct(dataProduct) {
    // Validate that all fields are present
    if (!dataProduct.title || !dataProduct.description || !dataProduct.price || !dataProduct.code) {
      throw new Error('All fields are required');
    }

    // Validate that the code field is unique
    for (let obj of this.#products) {
      if (obj.code === dataProduct.code) {
        throw new Error('Code already exists');
      }
    }

    dataProduct.id = this.#nextId++;
    const product = new Product(dataProduct);
    this.#products.push(product);
    return product.asPOJO();
  }

  getProducts() {
    return this.#products.map((p) => p.asPOJO());
  }

  getProductById(id) {
    const product = this.#products.find((p) => p.id === id);
    if (!product) {
      console.error('Not found');
      return null;
    }
    return product.asPOJO();
  }
}

//* test code
const datosProduct = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};
const datosProduct2 = {
  title: 'producto prueba 2',
  description: 'Este es un producto prueba 2',
  price: 300,
  thumbnail: 'Sin imagen 2',
  code: 'abc124',
  stock: 30,
};
const datosProduct3 = {
  title: 'producto prueba 2',
  description: 'Este es un producto prueba 2',
  price: 300,
  thumbnail: 'Sin imagen 2',
  code: 'abc124',
  stock: 30,
};

// create instance of ProductManager
const productManager = new ProductManager();

console.log(
  `Empy instance of productManager: ${productManager}\n-------------------------------------------\n`
);

// add product to ProductManager
productManager.addProduct(datosProduct);
console.log(productManager.getProducts());

console.log('\n-------------------------------------------\n');

productManager.addProduct(datosProduct2);
console.log(productManager.getProducts());

console.log('\n-------------------------------------------\n');

try {
  productManager.addProduct(datosProduct3);
} catch (error) {
  console.log(error.message);
}

console.log('\n-------------------------------------------\n');

// get product by id
console.log(productManager.getProductById(1)); // Debe mostrar el primer producto

console.log('\n');

try {
  productManager.getProductById(3);
} catch (error) {
  console.log(error.message);
}
