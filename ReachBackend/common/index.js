const express = require('express');
const router = express.Router();
const { checkDeviceEntry } = require('./common');

router.post('/checkDeviceEntry', checkDeviceEntry);

module.exports = router;