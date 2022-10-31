const router = require('express').Router();
const emailController = require('../controllers/emailController');
const authenticate = require('../middleware/authenticate');


router
    .route('/')
    .post(emailController.sendEmail);

module.exports = router;  