const router = require('express').Router();
const controller = require('../controllers/AuthController');

module.exports = (app) => {
  router.post('/login', controller.login);

  app.use('/auth', router);
};
