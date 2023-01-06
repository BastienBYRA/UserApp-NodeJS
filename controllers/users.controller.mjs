export class UsersController {
  repository;

  constructor(repository) {
    this.repository = repository;
  }

  getUsers(req, res) {
    this.repository.getAll().then((users) => {
      res.json(users);
    }).catch(() => {
      res.sendStatus(500).json({ error: 'Error reading users collection' });
    });
  }

  getUser(req, res) {
    const id = +req.params.id;

    this.repository.getOne(id).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.sendStatus(404).json({ error: 'User not found' });
    });
  }

  createUser(req, res) {
    const { firstName, lastName, email } = req.body;

    this.repository.create(firstName, lastName, email).then((user) => {
      res.json(user);
    }).catch(() => {
      res.status(500).json({ error: 'User not unique' });
    });
  }

  updateUser(req, res) {
    const { firstName, lastName, email } = req.body;
    const id = +req.params.id;

    this.repository.update(id, firstName, lastName, email).then((user) => {
      res.json(user);
    }).catch(() => {
      res.status(404).json({ error: 'User not found' });
    });
  }

  deleteUser(req, res) {
    const id = +req.params.id;

    this.repository.deleteOne(id).then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.status(404).json({ error: 'User not found' });
    });
  }
}
