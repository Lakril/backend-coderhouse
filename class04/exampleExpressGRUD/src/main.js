import express from 'express';
import checkPort from './checkPort.js';
import { UserManger } from './UserManager.js';

// Create = POST
// Read = GET
// Update = PUT
// Delete = DELETE

// json
const um = new UserManger('../db/users.json');

const app = express();

//* (3) urlencoded decodifica cosas que vienen en el body (formularios)
// para decodificar datos que vienen de un formulario; extended: true mejora el reconocimiento de los datos
app.use(express.urlencoded({ extended: true }));
// para decodificar datos que vinene del json del fetch (body) y los va a poner en req.body
app.use(express.json());

//* Console google chrome (1)
// fetch('http://localhost:8080', {method:'DELETE'})
// fetch('http://localhost:8080', {method:'PUT'})
// fetch('http://localhost:8080', {method:'POST'})
// fetch('http://localhost:8080', {method:'GET'})
// app.all('*', (req, res, next) => {
//   console.log(req.method);
//   res.json({});
// });

//* (2) req.query
app.get('/person', async (req, res) => {
  const { role, limit } = req.query;
  res.json(await um.getAllUsers({ role, limit }));
});

// POST: add new user
app.post('/person', async (req, res) => {
  //* (4) req.body
  res.json({ message: 'POST' });
  const { name, role, lastName, userName, password } = req.body;

  try {
    const create = await um.addUser({ name, role, lastName, userName, password });
    res.json(create);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//* (5) PUT: update user
app.put('/person/:id', async (req, res) => {
  res.json({ message: 'PUT' });
  const { name, role, lastName, userName, password } = req.body;

  // Convert role to an array
  const roles = role.split(',');

  const id = req.params.id;
  try {
    const updated = await um.updateUser(id, { name, roles, lastName, userName, password });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/person/:id', async (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  const id = req.params.id;
  try {
    const deleted = await um.deleteUser(id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/person/:id', async (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  const id = req.params.id;
  try {
    const search = await um.searchById(id);
    res.json(search);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/', async (req, res) => {
  res.sendFile('index.html', { root: '../views' });
});

//----------------------
const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
  .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
  .catch((err) => console.error(err));
