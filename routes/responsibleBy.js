const path = require('path');

const express = require('express');

const responsibleByController = require('../controllers/responsibleBy');

const router = express.Router();

router.post('/', responsibleByController.addResponsibleBy);

router.get('/new', responsibleByController.newResponsibleBy);

router.get('/:productId/edit', responsibleByController.editResponsibleBy);

router.put('/:productId/', responsibleByController.deleteResponsibleBy, responsibleByController.addResponsibleBy);


module.exports = router;