import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

const collectionName = 'users'

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, default: randomUUID },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
    },
    { strict: 'throw', versionKey: false }
)

export const User = mongoose.model(collectionName, userSchema)
