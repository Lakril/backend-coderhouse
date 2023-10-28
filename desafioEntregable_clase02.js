// Version: 1.0
// author: Jackson Rico

//* Helper function
function notNull(value, name) {
  if (value === null || value === undefined) {
    throw new Error(`${name || "value"} is null or undefined`);
  }
  return value;
}

//* Class Method (1)
class Product {
  // constructor() method.
  #price;
  #title;
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    // Properties
    this.id = notNull(id);
    this.#title = notNull(title, "title");
    this.description = description ?? "No description";
    this.#price = notNull(price, "price");
    this.thumbnail = thumbnail;
    this.code = notNull(code, "code");
    this.stock = notNull(stock, "stock");
  }

  get price() {
    return this.#price;
  }

  set price(newPrice) {
    if (newPrice <= 0) throw new Error("newPrice must be greater than 0");
    this.#price = newPrice;
  }

  asPOJO() {
    return {
      id: this.id,
      title: this.#title,
      description: this.description,
      price: this.#price,
      thumbnail: this.thumbnail,
      code: this.code,
      stock: this.stock,
    };
  }
}

//* Class Method (2)
class ProductManager {
  #nextId = 1;
  #products;
  constructor() {
    this.#products = [];
  }

  addProduct(dataProduct) {
    // Validate that all fields are present
    if (
      !dataProduct.title ||
      !dataProduct.description ||
      !dataProduct.price ||
      !dataProduct.code
    ) {
      throw new Error("All fields are required");
    }

    // Validate that the code field is unique
    for (let obj of this.#products) {
      if (obj.code === dataProduct.code) {
        throw new Error("Code already exists");
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
      console.error("Not found");
      return null;
    }
    return product.asPOJO();
  }
}

//* test code
const datosProduct = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};
const datosProduct2 = {
  title: "producto prueba 2",
  description: "Este es un producto prueba 2",
  price: 300,
  thumbnail: "Sin imagen 2",
  code: "abc124",
  stock: 30,
};
const datosProduct3 = {
  title: "producto prueba 2",
  description: "Este es un producto prueba 2",
  price: 300,
  thumbnail: "Sin imagen 2",
  code: "abc124",
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

console.log("\n-------------------------------------------\n");

productManager.addProduct(datosProduct2);
console.log(productManager.getProducts());

console.log("\n-------------------------------------------\n");

try {
  productManager.addProduct(datosProduct3);
} catch (error) {
  console.log(error.message);
}

console.log("\n-------------------------------------------\n");

// get product by id
console.log(productManager.getProductById(1)); // Debe mostrar el primer producto

console.log("\n");

try {
  productManager.getProductById(3);
} catch (error) {
  console.log(error.message);
}
