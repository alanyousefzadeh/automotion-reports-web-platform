const router = require('express').Router();
const schemehornController = require('../controllers/schemehornController');
const authenticate = require('../middleware/authenticate');

router
    .route('/')
    .post(schemehornController.data);

router
    .route('/discounts')
    .post(schemehornController.discountData)

router
    .route('/tickets')
    .post(schemehornController.tickets)

router
    .route('/payments')
    .post(schemehornController.payments)

module.exports = router;