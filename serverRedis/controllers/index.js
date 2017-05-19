var express = require('express');
    router = express.Router();

router.use('/api/anh', require('./anh'));

module.exports = router;