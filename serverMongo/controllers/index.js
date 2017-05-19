var express = require('express');
    router = express.Router();

router.use('/api/diadanh', require('./diadanh'));
router.use('/api/sohuuanh', require('./sohuuanh'));

module.exports = router;