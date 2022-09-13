const router = require('express').Router();
const schermerhornController = require('../controllers/schermerhornController');

router
    .route('/')
        .post(schermerhornController.data);

module.exports = router;