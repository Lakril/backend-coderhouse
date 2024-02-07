import crypto from 'crypto';

export class User {
  #password;
  constructor({ name, lastName, userName, password }, encrypted = false) {
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.#password = encrypted ? this.#encryptPassword(password) : password;
  }

  #encryptPassword(password) {
    return crypto.scryptSync(password, 'salt', 64).toString('hex');
    // return password + 'SECRET'
  }

  checkPassword(password) {
    return this.#password === this.#encryptPassword(password);
  }

  toPOJO() {
    return {
      name: this.name,
      lastName: this.lastName,
      userName: this.userName,
      password: this.#password,
    };
  }
}

// export default User;