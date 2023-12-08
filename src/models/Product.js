// import path from 'path';

// const defaultImg = path.join(path.dirname(new URL(import.meta.url).pathname), '../public/img/imagNoAvalibel.jpg');

//* Helper function
export function notNull(value, name) {
    try {
        if (!value) {
            throw new Error(`${name || 'value'} is null or undefined`);
        }
        return value;
    } catch (error) {
        // console.error(error);
    }
}

//* Class Method (1)
export class Product {
    // constructor() method.
    #title;
    #price;
    constructor({ id, title, price, description, thumbnails, stock, code, category, status }) {
        // Properties
        this.id = id;
        this.#title = notNull(title, 'Title');
        this.#price = notNull(price, 'Price');
        this.description = description ?? 'No description';
        this.thumbnails = thumbnails ?? '/public/img/imagNoAvalibel.jpg';
        this.stock = notNull(stock, 'Stock');
        this.code = notNull(code, 'Code');
        this.category = notNull(category, 'Category');
        this.status = status ?? true;
    }

    get price() {
        return this.#price;
    }

    toPOJO() {
        const pojo = {
            id: this.id,
            title: this.#title,
            price: this.#price,
            description: this.description,
            thumbnails: this.thumbnails,
            stock: this.stock,
            code: this.code,
            category: this.category,
            status: this.status,
        };
        return pojo;
    }
}
