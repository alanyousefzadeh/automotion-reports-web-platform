const router = require('express').Router();
const retrievalTimeController = require('../controllers/retrievalTimeController');
const authenticate = require('../middleware/authenticate');


router
    .route('/')
    .get(authenticate, retrievalTimeController.time);

module.exports = router;