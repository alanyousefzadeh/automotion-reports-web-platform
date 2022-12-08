const router = require('express').Router();
const carDetailsController = require('../controllers/carDetailsController');

router
    .route('/')
    .get( carDetailsController.carDetails);


module.exports = router;