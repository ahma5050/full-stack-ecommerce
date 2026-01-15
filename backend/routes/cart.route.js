import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { addToCart, getallCartProducts, getCartProducts, removeAllFromCart, updateQuantity } from '../controllers/cart.controller.js';
const router=express.Router();
router.post('/', protectRoute, addToCart);
router.post('/', protectRoute, getCartProducts);
router.delete('/', protectRoute, removeAllFromCart);
router.put('/:id', protectRoute, updateQuantity);
router.put('/', getallCartProducts);
export default router;
