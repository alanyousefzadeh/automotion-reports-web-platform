const router = require('express').Router();
const garageController = require('../controllers/garageController');
const authenticate = require('../middleware/authenticate');


// router
//     .route('/')
//     .get(garageController.garage);

router
    .route('/atlanticClosed')
    .get(garageController.atlanticClosed)

router
    .route('/transactions')
    .get(garageController.transactions)

module.exports = router;  