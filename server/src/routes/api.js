const express = require('express');
const router = express();
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const templatesController = require('../controllers/controller.js');
const searchController = require('../controllers/searchController');
const { body } = require('express-validator');
const commentsController = require('../controllers/commentsController.js');
const authMiddleware = require('../middleware/auth-middleware.js');
const questionController = require('../controllers/questionController.js');
const formsController = require('../controllers/formsController.js')
const answerController = require('../controllers/answersController.js')
const likeController = require('../controllers/likeController.js');
const tagsController = require('../controllers/tagsController.js');
const upload = require('../middleware/upload.js');
const statisticController = require('../controllers/statisticController.js');
const homeController = require('../controllers/mainPageController.js');
const resultController = require('../controllers/resultsController.js')
const SalesforceController = require('../controllers/salesforceController.js');
const { createJiraTicket, getJiraTickets } = require('../controllers/jiraIntegration.js');

router.post('/register', body('email').isEmail(), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

router.get('/getUsers', userController.getAllUsers);
router.get('/getUsers/:id?', userController.getUser);
router.put('/user/:id', userController.editUser);
router.post('/user/block/:id', userController.toggleBlockUser);
router.post('/user/unblock/:id', userController.toggleUnblockUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;