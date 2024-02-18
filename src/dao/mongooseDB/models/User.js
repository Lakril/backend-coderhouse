import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import process from 'process';

/**
 * Represents the user schema for the MongoDB collection 'users'.
 *
 * @typedef {Object} UserSchema
 * @property {string} _id - The unique identifier of the user.
 * @property {string} username - The username of the user.
 * @property {string} name - The name of the user.
 * @property {string} lastname - The last name of the user.
 * @property {string} password - The password of the user.
 * @property {string} email - The email address of the user.
 * @property {string} role - The role of the user. Can be 'user' or 'admin'.
 * @property {Schema.Types.ObjectId} cart - The reference to the user's cart.
 */

const userSchema = new Schema(
    {
        _id: { type: String, default: randomUUID },
        username: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        lastname: { type: String, default: '' },
        password: { type: String, default: '' },
        email: { type: String, unique: true, default: '' },
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
            login: async function login(email, password) {
                let dataUser;
                if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                    dataUser = {
                        name: 'admin',
                        lastname: 'admin',
                        email: 'admin',
                        role: 'admin',
                        username: 'admin',
                    };
                } else {
                    const user = await this.findOne({ email: email }).lean();
                    if (!user) {
                        throw new Error('login failed');
                    }

                    if (!(await bcrypt.compare(password, user.password))) {
                        throw new Error('login failed');
                    }

                    dataUser = {
                        username: user.username,
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        role: user.role,
                    };
                }
                return dataUser;
            },
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
            resetPassword: async function (email, password) {
                const user = await this.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }
                const newPassword = await bcrypt.hash(password, 10);
                const updated = await this.updateOne(
                    { email: email },
                    { $set: { password: newPassword } },
                    { new: true }
                );

                return updated;
            },
            deleteUser: async function (id) {
                const deletedUser = await this.findByIdAndDelete(id);
                return deletedUser;
            },
            // find by username and update user
            updateUser: async function (username, user) {
                const updatedUser = await this.findOneAndUpdate({ username: username }, user, {
                    new: true,
                });
                return updatedUser;
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
