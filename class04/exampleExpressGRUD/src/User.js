import crypto from 'crypto';

export class User {
  #password;
  constructor({ id, roles, name, lastName, userName, password }, encrypted = false) {
    this.id = id;
    this.roles = roles;
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.#password = encrypted ? this.#encryptPassword(password) : password;
  }

  // add roles
  addRoles(roles) {
    if (!Array.isArray(roles)) {
      throw new Error('Roles must be an array');
    }
    this.roles.push(...roles);
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
      id: this.id,
      roles: this.roles,
      name: this.name,
      lastName: this.lastName,
      userName: this.userName,
      password: this.#password,
    };
  }
}
