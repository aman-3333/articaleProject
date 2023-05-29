const express = require('express');
const router = express.Router();

const ArticaleController = require('../controllers/ArticaleController');
const UserController = require('../controllers/UserController');
const isAuthenticated = require('../middelware/authMiddelware');
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

router.post('/findAllUser', UserController.findAllUser);
router.post('/findOneUser', UserController.findOneUser);
router.patch('/users/:userId', UserController.updateUser);
router.post('/signin', UserController.deleteUser);

router.post('/createArticale',isAuthenticated, ArticaleController.createArticale);


router.get('/fetch',isAuthenticated, ArticaleController.findAllArticales);


router.get('/getOneArticale', isAuthenticated,ArticaleController.findOneArticale);


router.patch('/updateArticale',isAuthenticated, ArticaleController.updateArticale);


router.delete('/deleteArticale',isAuthenticated, ArticaleController.deleteArticale);

module.exports = router;