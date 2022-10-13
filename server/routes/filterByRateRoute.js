const router = require('express').Router();
const filterByRateController = require('../controllers/filterByRateController');


router
    .route('/')
    .get(filterByRateController.filterByRate);

module.exports = router;  