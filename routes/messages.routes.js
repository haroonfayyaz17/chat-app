const router = require('express').Router();
const {bearerAuth} = require('../middleware/auth');
const controller = require('../controllers/MessagesController');

module.exports = (app) => {
  router.get('/', controller.getAll);
  router.post('/', controller.sendMessage);
  router.put('/:id/mark_read', controller.markAsRead);

  app.use('/messages', bearerAuth, router);
};
