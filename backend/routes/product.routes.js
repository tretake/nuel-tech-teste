const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', authMiddleware, productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
