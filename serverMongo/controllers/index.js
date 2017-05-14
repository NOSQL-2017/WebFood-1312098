var express = require('express');
    router = express.Router();

router.use('/api/diadanh', require('./diadanh'));

module.exports = router;