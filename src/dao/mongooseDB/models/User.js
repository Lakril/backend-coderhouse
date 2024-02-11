import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        _id: { type: String, default: randomUUID },
        username: { type: String, required: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
        },
    },
    {
        strict: 'throw',
        versionKey: false,
        timestamps: true,
        collection: 'users',
        statics: {
            list: async function () {
                const users = await this.find().lean();
                return users;
            },
            listById: async function (id) {
                const user = await this.findById(id).lean();
                return user;
            },
            addUser: async function (user) {
                const newUser = new this(user);
                await newUser.save();
                return newUser;
            },
            updateUser: async function (id, user) {
                const updatedUser = await this.findByIdAndUpdate(id, user, { new: true });
                return updatedUser;
            },
            deleteUser: async function (id) {
                const deletedUser = await this.findByIdAndDelete(id);
                return deletedUser;
            },
        },
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

export default model('user', userSchema);
