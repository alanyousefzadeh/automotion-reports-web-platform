const router = require('express').Router();
const monthliesController = require('../controllers/monthliesController');
const authenticate = require('../middleware/authenticate');

router
    .route('/')
    .get(authenticate, monthliesController.monthlies);

module.exports = router;  