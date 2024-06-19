
import express from 'express';
const router = express.Router();
import { getProduct, index, createProduct, createCategories, getCategories, deleteCategory, getCategory, updateCategory, getLimitProducts, getProductById, updateProduct, getLoadProducts } from '../controller/index.js'
import { deleteProduct, getCategoryProduct, getSlideProducts } from '../controller/product.controller.js';

router.get('/', index)

// Categories
router.post('/create-categories', createCategories);
router.get('/get-categories', getCategories);
router.get('/get-category/:id', getCategory);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

// Products
router.post('/create-products', createProduct)
router.get('/get-products', getProduct)
router.get('/filter-products', getCategoryProduct)
router.get('/get-product/:slug', getProductById)
router.get('/get-limitProducts', getLimitProducts)
router.get('/get-loadProducts', getLoadProducts)
router.get('/get-slideProducts', getSlideProducts)
router.put('/update-product/:id', updateProduct)
router.delete('/delete-product/:id', deleteProduct)

export default router;