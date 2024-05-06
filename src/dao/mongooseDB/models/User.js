// @ts-nocheck
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
            login: async function (email, password) {
                let dataUser;
                if (email === config.admin.email && password === config.admin.password) {
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
                        throw new Error('Invalid email or password.');
                    }

                    if (!(await bcrypt.compare(password, user.password))) {
                        throw new Error('Invalid password.');
                    }

                    dataUser = {
                        username: user.username,
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        role: user.role,
                    };
                    // generate token for user
                    const token = await this.generateAuthToken(dataUser);
                    dataUser.token = token;
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
                if (!updatedUser) {
                    throw new Error('User not found');
                }
                return updatedUser.publicInfo();
            },
            generateAuthToken: function (data) {
                return jwt.sign({ data }, config.jwtSecret, { expiresIn: '1h' });
            },
            verifyToken: function (token) {
                return jwt.verify(token, config.jwtSecret, (err, decoded) => {
                    if (err) {
                        throw new Error('Invalid token');
                    }
                    return decoded.data;
                });
            },
            // newUser: async function (dataUser) {
            //     const exist = await this.findOne({ username: dataUser.username });
            //     if (exist) {
            //         throw new Error('User already exist');
            //     }
            //     const newUser = new this(dataUser);
            //     await newUser.save();
            //     return newUser;
            // },
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

export default model('User', userSchema);
