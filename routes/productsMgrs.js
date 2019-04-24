const path = require('path');

const express = require('express');

const productMgrController = require('../controllers/productMgrs');

const router = express.Router();

router.get('/', productMgrController.getProductMgrs);
router.get('/:mgrId', productMgrController.getProductMgrById);

module.exports = router;