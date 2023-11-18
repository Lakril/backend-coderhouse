# express

```js
import http from 'http'


// servidor es un programa que esta pensado para correr indefinidamente, que va reviser preguntas y las va a responder, esas preguntas se llaman eventos
const server = http.createServer((req, res) => {
    //req: request, res: response
    res.end('Hello World!')
})

// MAC address: es un identificador unico de la tarjeta de red de un dispositivo conectado a una red
// IP address: es un identificador unico de un dispositivo en una red (internet, red local, etc)
// PORT: es un numero que identifica un programa en un dispositivo en una red

// para iniciar un servido se necesita un puerto y una ip
const PORT = 8080
const IP = '127.0.0.1' // este valor es el localhost y es un valor predeterminado
server.listen(PORT, IP)
```

### Kill a process running on the specified port in Linux

Check the port: `ss -tl`
Close the port: `npx kill-port 3000`


## Metodos de peticion


GET: Obtener un recurso
POST: Crear o añadir un recurso
PUT: Modificar un recurso
DELETE: Eliminar un recurso