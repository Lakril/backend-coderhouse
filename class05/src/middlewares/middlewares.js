//* pipeline (middleware)
// entra un peticion y sale una respuesta. Cada una de estas peticiones las llamaremos middleware. Middleware: funciones que se ejecutan en el medio de la peticion y la respuesta. El ultimo middleware se le conoce como controlador o controller.

import multer from 'multer';


//? middleware interno
// pipeline: middleware1 -> middleware2 -> middleware3 -> controller
export function middleware1(req, res, next) {
  // req: petición
  // res: respuesta
  // next: funcion que se ejecuta para pasar al siguiente middleware
  console.log('middleware1');
  req.name = 'Pepe';
  next();
}
export function middleware2(req, res, next) {
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


//? middleware externo
export function middlewareOpt(req, res, next) {
  console.log('middlewareOpt');
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage });
