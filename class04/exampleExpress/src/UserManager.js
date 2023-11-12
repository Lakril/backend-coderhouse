import fs from 'fs/promises';
import { User } from './User.js';
import e from 'express';

export class UserManger {
  #route;
  constructor(route) {
    this.#route = route;
  }

  async addUser(infoUser) {
    const users = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    const user = new User(infoUser, true);

    const userPojo = user.toPOJO();
    users.push(userPojo);
    await fs.writeFile(this.#route, JSON.stringify(users, null, 2));

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

  async searchById(id) {
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    const pojo = pojos.find((u) => u.id === id);

    if (!pojo) {
      throw new Error(`User with id ${id} not found`);
    }

    return pojo;
  }

  async getAllUsers({role, limit}) {
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    let result
    if (role){
      result = pojos.filter((p) => p.roles.includes(role));
    } else {
      result = pojos;
    }
    if (limit){
      return result.slice(0, limit);
    } else {
      return result;
    }
    // const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    // return pojos;
  }

  // async reset() {
  //   await fs.writeFile(this.#route, JSON.stringify([]));
  // }

  //   removeUser(user) {
  //     this.users = this.users.filter((u) => u !== user);
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
