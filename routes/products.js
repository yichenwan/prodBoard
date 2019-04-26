const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

router.post('/', productsController.addProduct);

router.get('/new', productsController.newProduct);

router.get('/:productId/edit', productsController.editProduct);

router.put('/:productId', productsController.updateProduct);

router.delete('/:productId', productsController.deleteProduct);

router.get('/delete', productsController.getDeletePage);

module.exports = router;