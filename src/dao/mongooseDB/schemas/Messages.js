import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    _id: { type: Number, required: true, unique: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
});

export default model('Message', messageSchema);
