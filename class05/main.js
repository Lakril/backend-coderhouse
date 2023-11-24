import express from 'express';
import { middleware1, middleware2, upload } from './src/middlewares/middlewares';
import { usersRouter } from './src/routers/user.routing';
import { salesRouter } from './src/routers/sales.routing';

const app = express();

app.use(express.json()); // middleware para parsear el body de la peticion
app.use(express.urlencoded({ extended: true })); // middleware para parsear el body de la peticion

// middlewares internos
app.use(middleware1, middleware2);

// middlewares aplicados por express y aplicados a nivel global
app.use(express.static('./public'));
app.use(express.static('./views'));
app.use('/satic', express.static('./static'));

// middleware aplicado a nivel de ruta
app.post('/images', upload.single('photo'), (req, res) => {
  console.log(req.file);
  res.send(req.file);
});

// routes
app.use(usersRouter);
app.use(salesRouter);

app.listen(8080, () => {
  console.log('Example app listening on port 3000!');
});
