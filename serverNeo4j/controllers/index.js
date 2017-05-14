var express = require('express');
    router = express.Router();

router.use('/api/theodoi', require('./theodoi'));
router.use('/api/thichanh', require('./thichanh'));

module.exports = router;