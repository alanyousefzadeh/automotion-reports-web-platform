const router = require('express').Router();
const emailController = require('../controllers/emailController');
const authenticate = require('../middleware/authenticate');


router
    .route('/')
    .post(authenticate, emailController.sendEmail);

module.exports = router;  