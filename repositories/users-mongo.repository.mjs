import { User } from '../database/user.schema.mjs';

export class MongoUsersRepository {
  getAll() {
    return new Promise((resolve, reject) => {
      User.find((err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users.map((user) => user.toObject()));
        }
      })
    });
  }

  getOne(id) {
    return new Promise((resolve, reject) => {
      User.findById(id, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user.toObject());
        }
      })
    });
  }

  getByCriteria(params) {
    return new Promise((resolve, reject) => {
      User.find({$or: [
        { firstName: { $regex: params, $options: 'i' } },
        { lastName: { $regex: params, $options: 'i' } },
        { email: { $regex: params, $options: 'i' } }
      ]}, (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users.map((user) => user.toObject()));
        }
      })
    });
  }

  create(firstName, lastName, email) {
    return new Promise((resolve, reject) => {
      User.create({ firstName, lastName, email }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user.toObject());
        }
      })
    });
  }

  update(id, firstName, lastName, email) {
    return new Promise((resolve, reject) => {
      User.update({ _id: id }, { firstName, lastName, email }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    });
  }

  deleteOne(id) {
    return new Promise((resolve, reject) => {
      User.remove({ _id: id }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    });
  }
}
