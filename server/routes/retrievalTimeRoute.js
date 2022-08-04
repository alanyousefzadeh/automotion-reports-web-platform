const router = require('express').Router();
const retrievalTimeController = require('../controllers/retrievalTimeController');

router
    .route('/')
    .post(retrievalTimeController.time);

module.exports = router;