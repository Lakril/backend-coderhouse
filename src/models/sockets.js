import {controller as productsController} from '../controller/productsController.js';

const products = productsController.all();

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            console.log(socket.id);
            console.log('List products sent to client');
            // Listener envent: products
            socket.on('products', async (products) => {
                console.log(products);
                this.io.emit('products', this.products);

            });
            socket.emit('products', products);
        });
    }
}

export default Sockets;