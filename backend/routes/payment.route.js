import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { createCheckoutSession, createCheckoutsuccess } from '../controllers/payment.controller.js';
const router=express.Router();
router.post('/create-checkout-session', protectRoute, createCheckoutSession);
router.post('/checkout-success', protectRoute, createCheckoutsuccess);
export default router;