import { ProductManager } from './ProductManager.js';

const pm = new ProductManager('./database/products.json');

class Sockets {
    constructor(io) {
        this.io = io;
        this.products = pm
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            console.log(`connected: ${socket.id}`);
            // Emit all
            socket.emit('connected', socket.connected);

            // Emit all products
            console.log('List products sent to client');
            socket.emit('products-realtime', await this.products.getProducts());

            // Listener event: remove-product
            socket.on('remove-product', async (id) => {
                // console.log(id);
                await this.products.deleteProduct(id);
                socket.emit('products-realtime', await this.products.getProducts());
            });

            // Listener event: add-product
            socket.on('add-product', async (product) => {
                await this.products.addProduct(product);
                this.io.emit('products-realtime', await this.products.getProducts());
            });

            // Listener event: disconnect
            socket.on('disconnect', () => {
                console.log(`disconnect: ${socket.id}`);
            });
        });
    }
}

export default Sockets;
