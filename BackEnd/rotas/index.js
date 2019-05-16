const express = require('express');
const router = express.Router();

router.use('/', require('./selectAll'));
router.use('/', require('./select'));
router.use('/', require('./insert'));
router.use('/', require('./delete'));
router.use('/', require('./update'));

module.exports = router;