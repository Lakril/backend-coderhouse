//* Helper function
function notNull(value, name) {
  if (value === null || value === undefined) {
    throw new Error(`${name || 'value'} is null or undefined`);
  }
  return value;
}

//* Class Method (1)
export class Product {
  // constructor() method.
  #title;
  #price;
  constructor({ id, title, price, description, thumbnail, stock, code }) {
    // Properties
    this.id = id;
    this.#title = notNull(title, 'title');
    this.#price = notNull(price, 'price');
    this.description = description ?? 'No description';
    this.thumbnail = thumbnail;
    this.stock = notNull(stock, 'stock');
    this.code = notNull(code, 'code');
  }

  get price() {
    return this.#price;
  }

  set price(newPrice) {
    if (newPrice <= 0) throw new Error('newPrice must be greater than 0');
    this.#price = newPrice;
  }

  toPOJO() {
    const pojo = {
      id: this.id,
      title: this.#title,
      price: this.#price,
      description: this.description,
      thumbnail: this.thumbnail,
      stock: this.stock,
      code: this.code,
    };
    return pojo;
  }
}
