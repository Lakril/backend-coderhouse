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
// extended: true mejora el reconocimiento de los datos
// va a extrae los datos del body y los va a poner en req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Console google chrome (1)
// fetch('http://localhost:3000', {method:'DELETE'})
// fetch('http://localhost:3000', {method:'PUT'})
// fetch('http://localhost:3000', {method:'POST'})
// fetch('http://localhost:3000', {method:'GET'})
// app.all('*', (req, res, next) => {
//   console.log(req.method);
//   res.json({});
// });

//* (2)
app.get('/person', async (req, res) => {
  const { role, limit } = req.query;
  res.json(await um.getAllUsers({ role, limit }));
});

// POST: add new user
app.post('/person', async (req, res) => {
  //* (4) req.body
  console.log(req.body);
  const { name, role, lastName, userName, password } = req.body;

  try {
    const create = await um.addUser({ name, role, lastName, userName, password });
    res.json(create);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/person/:id', async (req, res) => {
  res.json({ message: 'PUT' });
  const { name, role, lastName, userName, password } = req.body;
  const id = Number(req.params.id);

  try {
    const udated = await um.updateUser({ id, name, role, lastName, userName, password });
    res.json(udated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/person', async (req, res) => {
  res.json({ message: 'DELETE' });
});

//----------------------

app.get('/person/:id', async (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  const id = Number(req.params.id);
  const search = person.find((p) => p.id === id);
  if (!search) {
    res.status(404).json({ error: `person with id ${id} No found` });
  } else {
    res.status(200).json(search);
  }
});

app.get('/', async (req, res) => {
  res.sendFile('index.html', { root: '../views' });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
  .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
  .catch((err) => console.error(err));
