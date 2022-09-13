const router = require('express').Router();
const schemehornController = require('../controllers/schemehornController');

router
    .route('/')
        .post(schemehornController.data);

module.exports = router;