const router = require('express').Router();
const controller = require('../controllers/UsersController');
const {bearerAuth} = require('../middleware/auth');

module.exports = (app) => {
  router.get('/', controller.getAll);
  router.post('/', controller.create);

  app.use('/users', bearerAuth, router);
};
