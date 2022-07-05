const router = require('express').Router();
const garageController = require('../controllers/garageController');

router
    .route('/')
    .get(garageController.garage);

module.exports = router;  