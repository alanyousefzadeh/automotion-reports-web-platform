const router = require('express').Router();
const schemehornController = require('../controllers/schemehornController');
const authenticate = require('../middleware/authenticate');

router
    .route('/')
    .post(authenticate, schemehornController.data);

router
    .route('/discounts')
    .post(authenticate, schemehornController.discountData)

router
    .route('/tickets')
    .post(authenticate, schemehornController.tickets)

router
    .route('/payments')
    .post(authenticate, schemehornController.payments)

module.exports = router;