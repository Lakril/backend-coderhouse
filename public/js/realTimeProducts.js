import { socket } from 'socket.io-client';


socket.on('products-realtime', (data) => {
    console.log(data);
});
