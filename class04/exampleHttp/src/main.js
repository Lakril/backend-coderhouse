import http from 'http';
import checkPort from './checkPort.js';
import fs from 'fs/promises';

// json
const person = { name: 'John', age: 30, city: 'New York' };

// servidor es un programa que esta pensado para correr indefinidamente, que va reviser preguntas y las va a responder, esas preguntas se llaman eventos
const server = http.createServer( async (req, res) => {
  //req: request, res: response
  //! step 1----------------------------
  // The 'Content-Type' header is used to indicate the media type of the resource. In this case, 'text/plain' is used to indicate that the resource is plain text. If you want to send back HTML instead of plain text, you can set the 'Content-Type' to 'text/html':
  //* res.setHeader('Content-Type', 'text/html')
  //* res.end('<h1>Hello World!</h1>')
  //And if you're sending back JSON data, you can set the 'Content-Type' to 'application/json':
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(person));
  //! step 2----------------------------
  console.log('req.url', req.url);
  switch (req.url) {
    case '/person':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(person));
      break;
    default:
        const file = await fs.readFile('../views/index.html', 'utf-8');
        res.end(file);
  }
});

//* Info
// MAC address: es un identificador unico de la tarjeta de red de un dispositivo conectado a una red
// IP address: es un identificador unico de un dispositivo en una red (internet, red local, etc)
// PORT: es un numero que identifica un programa en un dispositivo en una red

// para iniciar un servido se necesita un puerto y una ip
// IP es  127.0.0.1 que es igual localhost y es un valor predeterminado
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
  .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
  .catch((err) => console.error(err));
