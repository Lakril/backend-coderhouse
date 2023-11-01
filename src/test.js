import { Product } from './Product.js';

let products = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    thumbnail: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    stock: 68,
    code: 'wdlOhb',
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    thumbnail: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    stock: 80,
    code: 'UNYwaf',
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    thumbnail: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    stock: 54,
    code: 'VQemiv',
  },
];

let prod = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    thumbnail: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    stock: 68,
    code: 'wdlOhb',
  },
];

const product = new Product({
  id: 1,
  title: 'Example Product',
  price: 9.99,
  description: 'This is an example product',
  thumbnail: 'https://example.com/example-product.jpg',
  stock: 10,
  code: 'EXPROD',
});

// Convert the Product instance to a plain JavaScript object
// const productPOJO = product.toPOJO();
// const productJSON = JSON.stringify(productPOJO);

// const productListJSON = JSON.stringify(products.map((product) => product));
// console.log(productListJSON);

// console.log(product);
// console.log(productJSON);
// console.log(productPOJO);
// console.log(products.map((product) => product.price));

//const jj = JSON.stringify(users.map((u) => u.toPOJO()), null, 2)

// console.log(prod.map(u => u.toPOJO()));

// const jj = new Product(product)
console.log(product);
