const router = require('express').Router();
const garageController = require('../controllers/garageController');

router
    .route('/')
    .get(garageController.garage);

router
    .route('/atlantic')
    .get(garageController.atlantic)


module.exports = router;  