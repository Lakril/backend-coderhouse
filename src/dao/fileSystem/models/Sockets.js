import Product from '../../mongooseDB/schemas/Product.js';

class Sockets {
    constructor(io) {
        this.io = io;
        this.products = Product;
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
            socket.emit('products-realtime', await this.products.find());

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

            // Listener event: disconnect
            socket.on('disconnect', () => {
                console.log(`disconnect: ${socket.id}`);
            });
        });
    }
}

export default Sockets;
