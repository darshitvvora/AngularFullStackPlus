const express = require('express');
const controller = require('./email.controller');

const router = express.Router();

router.get('/', controller.index);

module.exports = router;
