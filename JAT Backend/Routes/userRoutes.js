const express = require('express');
const router = express.Router();

router.use('/user', require('../Controllers/userController'));

module.exports = router;