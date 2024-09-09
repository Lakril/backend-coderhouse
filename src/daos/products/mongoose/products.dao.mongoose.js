export class ProductsDaoMongoose {
    constructor(productsModel) {
        this.productsModel = productsModel;
    }
    async create(data) {
        const product = await this.productsModel.create(data);
        return product.toObject();
    }
    async readOne(query) {
        const product = await this.productsModel.findOne(query).lean();
        return product;
    }
    async readMany(query) {
        const products = await this.productsModel.find(query).lean();
        return products;
    }
    async updateOne(query, data) {
        const product = await this.productsModel
            .findOneAndUpdate(query, data, { new: true })
            .lean();
        return product;
    }
    async updateMany(query, data) {
        const products = await this.productsModel.updateMany(query, data, { new: true }).lean();
        return products;
    }
    async deleteOne(query) {
        const product = await this.productsModel.findOneAndDelete(query).lean();
        return product;
    }
    async deleteMany(query) {
        const products = await this.productsModel.deleteMany(query).lean();
        return products;
    }
}
