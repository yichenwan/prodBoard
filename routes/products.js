const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

router.post('/', productsController.addProduct);

router.get('/new', productsController.newProduct);

router.get('/:productId/edit', productsController.editProdcut);

router.put('/:productId', productsController.updateProdcut);

module.exports = router;