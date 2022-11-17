const router = require('express').Router();
const adminController = require('../controllers/adminController');

router
    .route('/list')
    .get( adminController.adminList);
router
    .route('/delete')
    .post(adminController.adminDelete)
router
    .route('/update')
    .post(adminController.adminUpdate)
router
    .route('/userDetails')
    .post(adminController.userDetails)

module.exports = router;