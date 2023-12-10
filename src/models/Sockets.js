import { ProductManager } from './ProductManager.js';

// const pm = new ProductManager('./database/products.json');

class Sockets {
    constructor(io) {
        this.io = io;
        this.products = new ProductManager('./database/products.json');
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            console.log(`connect ${socket.id}`);
            console.log('List products sent to client');
            // Listener envent: products
            socket.on('products-get', async (data) => {
                // console.log(products);
                this.io.emit('products-get', data);
            });
            socket.emit('products-realtime', await this.products.getProducts());
            
            socket.broadcast.emit('products-get', this.products.getProducts());

            // Listener event: realtimeproducts
            // socket.on('realtimeproducts', async (products) => {
            //     console.log(products);
            //     // Broadcast 'realtimeproducts' event to all other clients
            //     socket.broadcast.emit('realtimeproducts', this.products.getProducts());
            // });
        });
    }
}

export default Sockets;
