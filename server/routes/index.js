const express = require('express');
const router = express.Router();
const interestRoutes = require('./interestRoutes');

router.use(interestRoutes);

module.exports = router;