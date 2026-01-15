import express from 'express'
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { createProduct, deleteProduct, getallProducts, getFeaturedProduct, getProductByCategory, getRecommendationProducts, toggleFeaturedProduct } from '../controllers/product.controller.js';
const router=express.Router()
router.get('/', protectRoute, adminRoute, getallProducts);
router.get('/Featured', getFeaturedProduct);
router.get('/category/:category', getProductByCategory);
router.get('/recommendations', getRecommendationProducts);
router.get('/', protectRoute, adminRoute, createProduct);
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);


export default router;
