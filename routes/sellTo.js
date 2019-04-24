const path = require('path');

const express = require('express');

const sellToController = require('../controllers/sellTo');

const router = express.Router();

router.get('/', sellToController.getSellTo);

router.post('/', sellToController.addSellTo);

router.get('/new', sellToController.newSellTo);

module.exports = router;