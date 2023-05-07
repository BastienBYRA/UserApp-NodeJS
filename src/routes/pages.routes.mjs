import { Router } from 'express';

export const pagesRoutes = (controller) => {
  const router = Router();

  router.get('/', (req, res) => {
    controller.showHome(req, res);
  });

  router.get('/add', (req, res) => {
    controller.showAddUser(req, res);
  });

  router.post('/add', (req, res) => {
    controller.createUser(req, res);
  });

  router.get('/edit/:id', (req, res) => {
    controller.showEditUser(req, res);
  });

  router.post('/edit/:id', (req, res) => {
    controller.modifyUser(req, res);
  });

  router.post('/delete', (req, res) => {
    controller.deleteUser(req, res);
  });

  router.get('*', (req, res) => {
    controller.pageNotExist(req, res);
  });

  return router;
};
