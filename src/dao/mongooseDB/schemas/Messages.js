import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
    {
        user: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            getMessages: async function () {
                const messages = await this.find().lean();
                return messages;
            },
            addMessage: async function (message) {
                const newMessage = new this(message);
                await newMessage.save();
                return newMessage;
            },
        },
    }
);

export default model('Message', messageSchema);
