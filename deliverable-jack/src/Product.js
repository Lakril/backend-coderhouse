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
  #price;
  #title;
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    // Properties
    this.id = notNull(id);
    this.#title = notNull(title, 'title');
    this.description = description ?? 'No description';
    this.#price = notNull(price, 'price');
    this.thumbnail = thumbnail;
    this.code = notNull(code, 'code');
    this.stock = notNull(stock, 'stock');
  }

  get price() {
    return this.#price;
  }

  set price(newPrice) {
    if (newPrice <= 0) throw new Error('newPrice must be greater than 0');
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
