export class UsersRepository {
  nextId = 1;
  users = [];

  constructor() {
    this.create('Hector', 'DUPOND', 'hdupond@mns.fr');
    this.create('Lucie', 'MICHEL', 'lmichel@mns.fr');
  }

  getAll() {
    return Promise.resolve(this.users);
  }

  getOne(id) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject();
    }
  }

  create(firstName, lastName, email) {
    const existing = this.users.find((u) => u.email === email);
    if (existing) {
      return Promise.reject();
    }

    const user = {
      id: this.nextId++,
      firstName,
      lastName,
      email
    };

    this.users.push(user);
    return Promise.resolve(user);
  }

  update(id, firstName, lastName, email) {
    return this.getOne(id).then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      return user;
    });
  }

  deleteOne(id) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx >= 0) {
      this.users.splice(idx, 1);
      return Promise.resolve();
    }
    return Promise.reject();
  }
}
