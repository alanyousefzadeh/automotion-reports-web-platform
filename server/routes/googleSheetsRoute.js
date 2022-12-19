const router = require('express').Router();
const googleSheetsController = require('../controllers/googleSheetsController');

router
    .route('/')
    .get( googleSheetsController.sheets);

module.exports = router;