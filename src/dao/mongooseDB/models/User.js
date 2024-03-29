// @ts-nocheck
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import process from 'process';

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
        // tokens: [{ token: { type: String, required: true } }],
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
                        throw new Error('Invalid email or password.');
                    }

                    if (!(await bcrypt.compare(password, user.password))) {
                        throw new Error('Invalid email or password.');
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
                return updatedUser;
            },
            generateAuthToken: function (user) {
                // const user = this;
                const token = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                if (!token) {
                    throw new Error('Invalid token');
                }
                return token;
            },
            verifyToken: function (token) {
                return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                    if (err) {
                        throw new Error('Invalid token');
                    }
                    return user;
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

export default model('User', userSchema);
