var express = require('express');
    router = express.Router();

router.use('/api/anh', require('./images'));
router.use('/api/nguoidung', require('./nguoidung'));

module.exports = router;