const express = require('express');
const router = express.Router();
const userController  = require('../controllers/user');
const todoController = require('../controllers/todo');
const auth = require('../helpers/auth');

router.get('/', function(req, res) {
  res.send('Alive router');
})

// NOTE: User
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/user', userController.loginFB);
router.get('/user', userController.getAll);
router.get('/user/:id', userController.getById);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);
router.get('/appId', userController.appId);

// NOTE: Todo
router.post('/todo', auth.authenticate, todoController.insert);
router.get('/todo', todoController.getAll);
router.get('/todo/:id', auth.authenticate, todoController.getById);
router.get('/todo/user/:id', auth.authenticate, todoController.getByUserId);
router.put('/todo/:id', auth.authenticate, todoController.update);
router.delete('/todo/:id', auth.authenticate, todoController.delete);

module.exports = router;
