import Product from '../dao/mongooseDB/models/Product.js';
import Messages from '../dao/mongooseDB/models/Messages.js';

class Sockets {
    constructor(io) {
        this.io = io;
        this.products = Product;
        this.messages = Messages;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            console.log(`connected: ${socket.id}`);
            // Emit all
            socket.emit('connected', socket.connected);

            // Emit all products
            // console.log('List products sent to client');
            socket.emit('products-realtime', await this.products.find(), (err, res) => {
                if (err) {
                    console.log('Error sending products to client:', err);
                } else {
                    console.log('List products sent to client:', res.status);
                }
            });

            // Listener event: remove-product
            socket.on('remove-product', async (id) => {
                // console.log(id);
                await this.products.findByIdAndDelete({ _id: id });
                socket.emit('products-realtime', await this.products.find());
            });

            // Listener event: add-product
            socket.on('add-product', async (product) => {
                await this.products.create(product);
                this.io.emit('products-realtime', await this.products.find());
            });

            // ? ----------- Chat-Messages ----------------- *//

            // user connected
            socket.on('user-connected', (username) => {
                console.log('user connected:', username);
                socket.broadcast.emit('user-connected', username);
            });

            // Listener event: new-message
            socket.on('chat-messages', async (message) => {
                console.log('Received message:', message);

                // Save the message to MongoDB
                try {
                    await this.messages.create(message);
                    console.log('Message saved to the database');
                } catch (error) {
                    console.error('Error saving message to database:', error);
                }

                // Broadcast the message to all connected clients
                this.io.emit('chat-messages', await this.messages.find());
            });

            // Listener event: disconnect
            socket.on('disconnect', () => {
                console.log(`disconnect: ${socket.id}`);
            });
        });
    }
}

export default Sockets;
