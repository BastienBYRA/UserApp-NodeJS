import { Router } from 'express';

export const usersRoutes = (controller) => {
  const router = Router();

  router.get('/', (req, res) => {
    controller.getUsers(req, res);
  });

  router.get('/:id', (req, res) => {
    controller.getUser(req, res);
  });

  router.post('/', (req, res) => {
    controller.createUser(req, res);
  });

  router.put('/:id', (req, res) => {
    controller.updateUser(req, res);
  });

  router.delete('/:id', (req, res) => {
    controller.deleteUser(req, res);
  });

  return router;
};
