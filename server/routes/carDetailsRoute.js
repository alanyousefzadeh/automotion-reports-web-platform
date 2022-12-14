const router = require('express').Router();
const carDetailsController = require('../controllers/carDetailsController');
const authenticate = require('../middleware/authenticate');

router
    .route('/')
    .get(authenticate, carDetailsController.carDetails);


module.exports = router;