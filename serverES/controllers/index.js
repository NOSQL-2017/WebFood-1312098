var express = require('express');
    router = express.Router();

router.use('/api/search', require('./search'));

module.exports = router;