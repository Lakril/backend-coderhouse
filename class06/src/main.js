import express from 'express';
import handlebars from 'express-handlebars';
import { webRouter } from './routers/web.router.js';
import { Server } from 'socket.io';

const messages = []
const messagesManager = {
  addMessage: (message) => {
    messages.push(message);
  },
  getMessage: () => {
    return messages;
  },
};

const app = express();

app.engine('handlebars', handlebars.engine());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

const webSocketServer = new Server(server);

app.use('/static', express.static('./static'));
app.use('/', webRouter);

webSocketServer.on('connection', (socket) => {
  // console.log(socket.handshake.auth.username + ' connected');
  socket.broadcast.emit('NewUser', socket.handshake.auth.username);

  socket.emit(
    'messages',
    messagesManager.getMessage()
  )

  socket.on('message', (message) => {
    // socket.broadcast.emit('message', message);
    messagesManager.addMessage(message);
    webSocketServer.emit('messages', messagesManager.getMessage());
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnectedUser', socket.handshake.auth.username);
  });
});
