const router = require('express').Router();
const loginController = require('../controllers/loginController');

router
    .route('/')
    .post(loginController.login);

module.exports = router;