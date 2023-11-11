import express from 'express';
import checkPort from './checkPort.js';


// json
const person = { name: 'John', age: 30, city: 'New York' };

const app = express();

//server express
app.get('/person',  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(person);  
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
