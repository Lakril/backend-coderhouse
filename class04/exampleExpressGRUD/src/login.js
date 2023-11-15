import { UserManger } from './UserManager.js';

import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.resolve(__dirname, '../db/users.json');

const um = new UserManger(filePath);

const user1 = {
  id: 1,
  name: 'Juan',
  lastName: 'Perez',
  userName: 'jperez',
  password: 'juan123',
};

const user2 = {
  id: 2,
  name: 'Pedro',
  lastName: 'Gomez',
  userName: 'pgomez',
  password: 'gomez123',
};

const user3 = {
  id: 3,
  name: 'Maria',
  lastName: 'Gonzalez',
  userName: 'mgonzalez',
  password: 'gonzalez123',
};

const user4 = {
  id: 4,
  name: 'Jackson',
  lastName: 'Rico',
  userName: 'jrico',
  password: 'rico123',
};

await um.addUser(user1);
await um.addUser(user2);
await um.addUser(user3);
await um.addUser(user4);

// await um.reset();

// const search = await um.login('Lakril', '123fdf**f');
// console.log(`Logueado correctamente!\n${search.toString()}`);

// console.log('username invalido');
// try {
//   await um.login('pepe', 'password2');
// } catch (error) {
//   console.log(error.message);
// } finally {
//   console.log('finally');
// }
// console.log('------------------------');
// console.log('password invalido');
// try {
//   await um.login('Lakril', '123');
// } catch (error) {
//   console.log(error.message);
// } finally {
//   console.log('finally');
// }
