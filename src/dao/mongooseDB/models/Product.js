import mongoose, { Schema, model } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import mongoosePaginate from 'mongoose-paginate-v2';

const AutoIncrement = AutoIncrementFactory(mongoose);
// const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        _id: Number,
        title: {
            type: String,
            required: [true, 'You must provide an title.'],
            trim: true,
        },
        description: { type: String, default: 'No description' },
        code: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        thumbnails: {
            type: Array,
            default: ['/public/img/imagNoAvalibel.jpg'],
        },
        category: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    {
        strict: 'throw',
        versionKey: false,
        _id: false,
        statics: {
            list: async function () {
                const products = await this.find().lean();
                return products;
            },
            listByCategory: async function (category) {
                const products = await this.find({ category: category }).lean();
                return products;
            },
            listByCode: async function (code) {
                const products = await this.find({ code: code }).lean();
                return products;
            },
            listById: async function (id) {
                const products = await this.find({ _id: id }).lean();
                return products;
            },
            addProduct: async function (product) {
                const newProduct = new this(product);
                await newProduct.save();
                return newProduct;
            },
            updateProduct: async function (id, product) {
                const updatedProduct = await this.findByIdAndUpdate(id, product, { new: true });
                return updatedProduct;
            },
            deleteProduct: async function (id) {
                const deletedProduct = await this.findByIdAndDelete(id);
                return deletedProduct;
            },
            upload: async function (products) {
                mongoose.connection.dropCollection('counters');
                await this.deleteMany({});
                const newProducts = await this.insertMany(products);
                if (!newProducts) {
                    throw new Error('Error inserting products');
                }
                return newProducts;
            },
            // aggregate group by category
            groupByCategory: async function () {
                const products = await this.aggregate([
                    {
                        $group: {
                            _id: '$category',
                            products: { $push: '$$ROOT' },
                        },
                    },
                ]);
                return products;
            },
            getUniqueCategories: async function () {
                const categories = await this.distinct('category');
                return categories;
            },
        },
    }
);

productSchema.pre('save', function (next) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    next();
});

productSchema.plugin(AutoIncrement, { start_seq: 21 });
productSchema.plugin(mongoosePaginate);

export default model('products', productSchema);

// export default Product;
