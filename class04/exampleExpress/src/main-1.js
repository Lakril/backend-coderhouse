import express from 'express';
import checkPort from './checkPort.js';

// json
const person = [
  { id: 1, name: 'John', age: 30, city: 'New York' },
  { id: 2, name: 'Peter', age: 20, city: 'Paris' },
  { id: 3, name: 'Mark', age: 40, city: 'London' },
  { id: 4, name: 'Maria', age: 30, city: 'Berlin' },
  { id: 5, name: 'Monica', age: 50, city: 'Oslo' },
];

const app = express();

//server express
app.get('/person', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(person);
});

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
  //   const file = await fs.readFile('../views/index.html', 'utf-8');
  res.sendFile('index.html', { root: '../views' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
  .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
  .catch((err) => console.error(err));
