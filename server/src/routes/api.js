const express = require('express');
const router = express();
const authController = require('../controllers/authController.js');
const ServiceController = require('../controllers/ServiceController.js');
const HallController = require('../controllers/hallController.js');
const TrainerController = require('../controllers/trainerController.js');
const userController = require('../controllers/userController.js');
// const templatesController = require('../controllers/controller.js');
// const searchController = require('../controllers/searchController');
// const { body } = require('express-validator');
// const commentsController = require('../controllers/commentsController.js');
// const authMiddleware = require('../middleware/auth-middleware.js');
// const questionController = require('../controllers/questionController.js');
// const formsController = require('../controllers/formsController.js')
// const answerController = require('../controllers/answersController.js')
// const likeController = require('../controllers/likeController.js');
// const tagsController = require('../controllers/tagsController.js');
// const upload = require('../middleware/upload.js');
// const statisticController = require('../controllers/statisticController.js');
// const homeController = require('../controllers/mainPageController.js');
// const resultController = require('../controllers/resultsController.js')
// const SalesforceController = require('../controllers/salesforceController.js');
// const { createJiraTicket, getJiraTickets } = require('../controllers/jiraIntegration.js');

router.post('/register',authController.register);
router.post('/login', authController.login);

router.get('/service/:id', ServiceController.getService);
router.get('/services', ServiceController.getAllServices);
router.post('/services', ServiceController.createService);
router.put('/services/:id', ServiceController.editService);
router.delete('/services/:id', ServiceController.deleteService);

router.get('/halls', HallController.getAllHalls);
router.post('/hall', HallController.createHall);
router.put('/hall/:id', HallController.editHall);
router.delete('/hall/:id', HallController.deleteHall);

router.get('/trainers', TrainerController.getAllTrainers);
router.get('/trainer/:id', TrainerController.getTrainer);
router.post('/trainer', TrainerController.createTrainer);
router.put('/trainer/:id', TrainerController.editTrainer);
router.delete('/trainer/:id', TrainerController.deleteTrainer);

const ClassController = require('../controllers/classController');

router.get('/classes/:id', ClassController.getClass);
router.get('/classes', ClassController.getAllClasses);
router.post('/classes', ClassController.createClass);  // Changed from '/class'
router.put('/classes/:id', ClassController.editClass); // Changed from '/class/:id'
router.delete('/classes/:id', ClassController.deleteClass);

router.get('/getUsers', userController.getAllUsers);
router.get('/getUsers/:id?', userController.getUser);
router.put('/user/:id', userController.editUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;