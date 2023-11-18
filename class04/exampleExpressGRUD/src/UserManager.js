import fs from 'fs/promises';
import { User } from './User.js';
import { randomUUID } from 'crypto';

// Generate a random UUID
const uuid = randomUUID();

export class UserManger {
  #route;
  constructor(route) {
    this.#route = route;
  }

  async addUser({ role, name, lastName, userName, password }) {
    if (typeof this.#route !== 'string') {
      throw new Error('Route must be a string');
    }
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));

    const user = new User(
      {
        id: uuid,
        roles: [role],
        name,
        lastName,
        userName,
        password,
      },
      true
    );

    const newPojo = user.toPOJO();
    pojos.push(newPojo);
    await fs.writeFile(this.#route, JSON.stringify(pojos, null, 2));

    return newPojo;
  }

  async searchById(id) {
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    const pojo = pojos.find((u) => u.id === id);

    if (!pojo) {
      throw new Error(`User with id ${id} not found`);
    }

    return pojo;
  }

  async getAllUsers({ role, limit }) {
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    let result;
    if (role) {
      result = pojos.filter((p) => p.roles.includes(role));
    } else {
      result = pojos;
    }
    if (limit) {
      return result.slice(0, limit);
    } else {
      return result;
    }
  }

  async updateUser(id, fields) {
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    const userIndex = pojos.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    const user = pojos[userIndex];
    const updatedUser = { ...user, ...fields };
    pojos[userIndex] = updatedUser;

    await fs.writeFile(this.#route, JSON.stringify(pojos, null, 2));

    return updatedUser;
  }

  async deleteUser(id) {
    const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
    const pojoIndex = pojos.findIndex((u) => u.id === id);

    if (pojoIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    const [deleted] = pojos.splice(pojoIndex, 1);

    return deleted;
  }

  async reset() {
    await fs.writeFile(this.#route, '[]');
  }

  // async login(username, password) {
  //   const pojos = JSON.parse(await fs.readFile(this.#route, 'utf-8'));
  //   const pojo = pojos.find((u) => u.userName === username);

  //   if (!pojo) {
  //     throw new Error('Wrong password or username');
  //   }

  //   const user = new User(pojo);
  //   if (!user.checkPassword(password)) {
  //     throw new Error('Wrong password or username');
  //   }
  //   return pojo;
  // }
}
