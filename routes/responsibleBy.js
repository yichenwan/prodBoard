const path = require('path');

const express = require('express');

const responsibleByController = require('../controllers/responsibleBy');

const router = express.Router();

router.post('/', responsibleByController.addResponsibleBy);

router.get('/new', responsibleByController.newResponsibleBy);

module.exports = router;