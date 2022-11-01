const router = require('express').Router();
const filterByRateController = require('../controllers/filterByRateController');
const authenticate = require('../middleware/authenticate');

router
    .route('/')
    .get(authenticate, filterByRateController.filterByRate);

module.exports = router;  