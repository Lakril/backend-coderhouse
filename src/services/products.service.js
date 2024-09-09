import { getDaoProducts } from '../daos/products/products.dao.js';

const productsDao = getDaoProducts();

class ProductsService {
    async readone(query) {
        return await productsDao.readOne(query);
    }
    async readMany(query) {
        return await productsDao.readMany(query);
    }
    async create(data) {
        return await productsDao.create(data);
    }
    async updateone(query, data) {
        return await productsDao.updateOne(query, data);
    }
    async updatemany(query, data) {
        return await productsDao.updateMany(query, data);
    }
    async deleteone(query) {
        return await productsDao.deleteOne(query);
    }
    async deletemany(query) {
        return await productsDao.deleteMany(query);
    }
}

export const productsService = new ProductsService();
