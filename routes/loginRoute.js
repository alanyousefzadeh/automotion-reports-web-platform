const router = require('express').Router();
const loginController = require('../controllers/loginController');
const authenticate = require('../middleware/authenticate');

router
    .route('/')
    .post(authenticate, loginController.login);

module.exports = router;