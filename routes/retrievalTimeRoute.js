const router = require('express').Router();
const retrievalTimeController = require('../controllers/retrievalTimeController');

router
    .route('/')
    .get(retrievalTimeController.time);

module.exports = router;