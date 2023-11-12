import express from 'express';
import checkPort from './checkPort.js';
import { UserManger } from './UserManager.js';

// json
const um = new UserManger('../db/users.json')

const app = express();

//server express
// e.g. http://localhost:3000/person?limit=1&roles=admin
// e.g. http://localhost:3000/person?roles=admin
//* step 1
// app.get('/person', async (req, res) => {
//   const {roles, limit} = req.query;
//   if (roles || limit) {
//     res.json(await um.getAllUsers(req.query));
//   } else {
//   res.setHeader('Content-Type', 'application/json');
//   res.json(await um.getAllUsers(req.query));
//   }
// });

//* step 2
app.get('/person', async (req, res) => {
  const {role, limit} = req.query;
  res.json(await um.getAllUsers({role, limit}));
  });



app.get('/person/:id', async (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  const id = Number(req.params.id);
  try {
    const search = await um.searchById(id);
    res.json(search);
  } catch (error) {
    res.status(404).json({messege: error.message});
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
