import fs from 'fs/promises';
import { User } from './User.js';

export class UserManger {
  #route;
  constructor(route) {
    this.#route = route;
  }

  async addUser(infoUser) {
    const users = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    const user = new User(infoUser, true);
    users.push(user);
    await fs.writeFile(
      this.#route,
      JSON.stringify(
        users.map((u) => u.toPOJO()),
        null,
        2
      )
    );
    return user;
  }

  async login(username, password) {
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    const pojo = pojos.find((u) => u.userName === username);

    if (!pojo) {
      throw new Error('Wrong password or username');
    }

    const user = new User(pojo);
    if (!user.checkPassword(password)) {
      throw new Error('Wrong password or username');
    }
    return pojo;
  }

  async reset() {
    await fs.writeFile(this.#route, JSON.stringify([]));
  }

  //   removeUser(user) {
  //     this.users = this.users.filter((u) => u !== user);
  //   }

  //   getUser(username) {
  //     return this.users.find((u) => u.username === username);
  //   }

  //   getAllUsers() {
  //     return this.users;
  //   }
}

// const userPath = new URL('../db/users.json', import.meta.url);

// const um = new UserManger(userPath);
// um.addUser({
//   name: 'name',
//   lastName: 'lastName',
//   userName: 'userName',
//   password: 'password',
// });

// console.log(um);
