const router = require('express').Router();
const atlanticOpenAPIController = require('../controllers/atlanticOpenAPIController');

const authenticate = require('../middleware/authenticate');

//router.use(authenticate);

router
    .route('/')
    .get(authenticate, atlanticOpenAPIController.atlanticOpenAPI);

module.exports = router;