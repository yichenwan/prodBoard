const path = require('path');

const express = require('express');

const clientsController = require('../controllers/clients');

const router = express.Router();

router.get('/', clientsController.getClients);
router.post('/', clientsController.addClient);
router.get('/new', clientsController.newClient);

module.exports = router;