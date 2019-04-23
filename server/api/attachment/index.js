const express = require('express');
const controller = require('./attachment.controller');

const router = express.Router();

router.get('/', controller.index);

module.exports = router;
