import { controller } from '../../src/controller/productsController.js';

const clients = new Map();
const products = controller.all();

export default function (io) {
    io.on('connection', async (socket) => {
        console.log(socket.id);
        console.log('A user connected');
        clients.set(socket.id, socket);
        socket.on('products', async (products) => {
            io.emit('products', await products);
        });
        socket.emit('products', await products);
        // ulMessages.innerHTML = '';

        // socket.on('disconnect', () => {
        //     console.log('A user disconnected');
        //     clients.delete(socket.id);
        // });
        // socket.on('broadcast', (message) => {
        //     io.emit('broadcast', message);
        // });
    });
}

export function emitToClient(clientId, event, data) {
    const client = clients.get(clientId);
    if (client) {
        client.emit(event, data);
    }
}
