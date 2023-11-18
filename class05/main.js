import express from 'express';

const app = express();

// app.use(express.json()); // middleware para parsear el body de la peticion
app.use(express.urlencoded({ extended: true })); // middleware para parsear el body de la peticion

app.use(middleware1, middleware2);
// app.use(middleware2);
// app.use(middleware3);
// app.use(controller); // esto es lo mismo que el post de abajo; get, post, put, delete, patch, etc. son metodos de http
app.get('/users', getController);
app.post('/users', express.json(), middlewareOpt, postController);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

//* pipeline (middleware)
// entra un peticion y sale una respuesta. Cada una de estas peticiones las llamaremos middleware. Middleware: funciones que se ejecutan en el medio de la peticion y la respuesta. El ultimo middleware se le conoce como controlador o controller.

// pipeline: middleware1 -> middleware2 -> middleware3 -> controller
function middleware1(req, res, next) {
  // req: petición
  // res: respuesta
  // next: funcion que se ejecuta para pasar al siguiente middleware
  console.log('middleware1');
  req.name = 'Pepe';
  next();
}

function middleware2(req, res, next) {
  console.log('middleware2');
  // res.send('I am middleware2 without next()');
  req.older = 30;
  next();
}

// function middleware3(req, res, next) {
//   console.log('middleware3');
//   req.greeting = () => {
//     console.log('Hello');
//   };
//   next();
// }

function middlewareOpt(req, res, next) {
  console.log('middlewareOpt');
  next();
}

//? controller 1
// const users = [];
// function controller(req, res) {
//   console.log('Add user');
//   // este ultimo middleware es el que se encarga de enviar la respuesta y no debe llevar next()
//   // cuando se llega al controlador, el objeto req ya tiene todas las propiedades que se le han ido añadiendo en los middleware anteriores
//   req.greeting();
//   console.log(req.user + ' is ' + req.older + ' years old');
//   res.send('I am the controller and arraived to the end of the pipeline');
// }

//? const 2
const users = [];

//? controller 2
function getController(req, res) {
  console.log('serch user');
  res.json(users);
}

//? controller 2
function postController(req, res) {
  console.log('Add user');
  const user = req.body;
  console.log(user);
  users.push(user);
  res.json(user);
}

// Path: class05/package.json
