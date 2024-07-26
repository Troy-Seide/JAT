const express = require('express');
const router = express.Router();

router.use('/jobs', require('../Controllers/jobsController'));

module.exports = router;