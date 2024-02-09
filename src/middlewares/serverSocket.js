// create server socket
import { Server } from 'socket.io';

export const createServerSocket = (httpServer) => {
    return new Server(httpServer, {});
};
