const router = require('express').Router();
const schemehornController = require('../controllers/schemehornController');

router
    .route('/')
        .post(schemehornController.data);
    
router    
    .route('/discounts')
        .post(schemehornController.discountData)

module.exports = router;