var express = require('express');
    router = express.Router();

router.use('/api/images', require('./images'));
router.use('/api/users', require('./users'));
router.use('/api/login', require('./login'));
router.use('/api/followers', require('./followers'));

module.exports = router;