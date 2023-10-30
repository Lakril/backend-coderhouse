import { UserManger } from './UserManager.js';

import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.resolve(__dirname, '../db/users.json');

const um = new UserManger(filePath);
await um.reset();

const user = await um.addUser({
  name: 'Jack',
  lastName: 'Rico',
  userName: 'Lakril',
  password: '123fdf**f',
});

console.log(user);

const search = await um.login('Lakril', '123fdf**f');
console.log(`Logueado correctamente!\n${search.toString()}`);

console.log('username invalido');
try {
  await um.login('pepe', 'password2');
} catch (error) {
  console.log(error.message);
} finally {
  console.log('finally');
}
console.log('------------------------');
console.log('password invalido');
try {
  await um.login('Lakril', '123');
} catch (error) {
  console.log(error.message);
} finally {
  console.log('finally');
}
