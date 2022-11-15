const router = require('express').Router();
const adminController = require('../controllers/adminController');

router
    .route('/list')
    .get( adminController.adminList);
router
    .route('/delete')
    .post(adminController.adminDelete)

module.exports = router;