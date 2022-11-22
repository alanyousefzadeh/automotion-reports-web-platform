const router = require('express').Router();
const wakeUpController = require('../controllers/wakeUpController');

router
    .route('/')
    .get( wakeUpController.wakeUp);


module.exports = router;