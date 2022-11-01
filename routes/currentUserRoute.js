const router = require('express').Router();
const currentUserController = require('../controllers/currentUserController');

const authenticate = require('../middleware/authenticate');

//router.use(authenticate);

router
    .route('/')
    .get(authenticate, currentUserController.currentUser);

module.exports = router;