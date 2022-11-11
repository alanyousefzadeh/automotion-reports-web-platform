const router = require('express').Router();
const garageController = require('../controllers/garageController');
const authenticate = require('../middleware/authenticate');
const pdf = require('../pdf/createPdf');

// router
//     .route('/')
//     .get(garageController.garage);

router
    .route('/atlanticClosed')
    .get(garageController.atlanticClosed)

router
    .route('/transactions')
    .get(garageController.transactions)

router
    .route('/transactions-pdf')
    .get(pdf.createPdf)

module.exports = router;  