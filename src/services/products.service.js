import { ProductsDao } from '../daos/products.dao';

class ProductsService {
    async getProducts() {
        return await this.productsDao.readMany({});
    }
}
