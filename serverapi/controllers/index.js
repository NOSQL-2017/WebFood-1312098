var express = require('express');
    router = express.Router();

router.use('/api/anh', require('./images'));
router.use('/api/nguoidung', require('./nguoidung'));
router.use('/api/theodoi', require('./followers'));
router.use('/api/diadanh', require('./diadanh'));

module.exports = router;