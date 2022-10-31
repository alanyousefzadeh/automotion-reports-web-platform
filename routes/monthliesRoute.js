const router = require('express').Router();
const monthliesController = require('../controllers/monthliesController');


router
    .route('/')
    .get(monthliesController.monthlies);

module.exports = router;  