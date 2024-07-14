import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import config from '../../../config/index.js';

const userSchema = new Schema(
    {
        _id: { type: String, default: randomUUID },
        username: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        password: { type: String, required: true },
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
        methods: {
            publicInfo: function () {
                return {
                    username: this.username,
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    role: this.role,
                };
            },
        },
        statics: {
            register: async function (reqBody) {
                // await this.
                this.assignRole(reqBody);
                const newUser = new this(reqBody);
                if (!newUser) {
                    throw new Error('User not created');
                }
                await newUser.save();
                return newUser.publicInfo();
            },
            assignRole: function (obj) {
                if (obj.email === config.admin.email) {
                    obj.role = 'admin';
                } else {
                    obj.role = 'user';
                }
            },
            login: async function (email, password) {
                const user = await this.findOne({ email: email });
                // console.log('User: ', user);
                if (!user) {
                    throw new Error('Invalid email or password.');
                }
                if (!(await bcrypt.compare(password, user.password))) {
                    throw new Error('Invalid password.');
                }
                return user.publicInfo();
            },
            updateUser: async function (data) {
                const updatedUser = await this.findOneAndUpdate(
                    { email: data.email },
                    { $set: data },
                    { new: true }
                );
                // console.log('updatedUser: ', updatedUser);
                if (!updatedUser) {
                    throw new Error('User not found');
                }
                return updatedUser.publicInfo();
            },
            resetPassword: async function ({ email, password: newPassword }) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const updated = await this.findOneAndUpdate(
                    { email },
                    { $set: { password: hashedPassword } },
                    { new: true }
                );
                if (!updated) {
                    throw new Error('Password not updated');
                }

                return updated.publicInfo();
            },
            deleteUser: async function (id) {
                const deletedUser = await this.findByIdAndDelete(id);
                return deletedUser;
            },
            generateAuthToken: function (data) {
                console.log('data for token: ', data);
                return new Promise((resolve, reject) => {
                    if (!data) {
                        return reject(new Error('Invalid data to generate token'));
                    }
                    jwt.sign(data, config.jwt.secret, { expiresIn: '24h' }, (err, token) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(token);
                        }
                    });
                });
            },
            // list: async function () {
            //     const users = await this.find().lean();
            //     return users;
            // },
            // listById: async function (id) {
            //     const user = await this.findById(id).lean();
            //     return user;
            // },
            // addUser: async function (user) {
            //     const newUser = new this(user);
            //     await newUser.save();
            //     return newUser;
            // },
            verifyToken: function (token) {
                return jwt.verify(token, config.jwt.secret, (err, decoded) => {
                    if (err) {
                        throw new Error('Invalid token');
                    }
                    return decoded.data;
                });
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

// Define the ASSINGN_ROLE function
export default model('User', userSchema);
