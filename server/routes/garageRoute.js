const router = require('express').Router();
const garageController = require('../controllers/garageController');
const authenticate = require('../middleware/authenticate');

router
    .route('/atlanticClosed')
    .get(garageController.atlanticClosed)

router
    .route('/transactions')
    .get(garageController.transactions)

module.exports = router;  