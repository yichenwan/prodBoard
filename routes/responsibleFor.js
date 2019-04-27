const path = require('path');

const express = require('express');

const responsibleForController = require('../controllers/responsibleFor');

const router = express.Router();

router.post('/', responsibleForController.addresponsibleFor);

router.get('/new', responsibleForController.newresponsibleFor);

router.get('/:productId/edit', responsibleForController.editresponsibleFor);

router.put('/:productId/', responsibleForController.deleteresponsibleFor, responsibleForController.addresponsibleFor);


module.exports = router;