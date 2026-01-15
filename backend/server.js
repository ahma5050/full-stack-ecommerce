import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
 import authRoutes from './routes/auth.route.js';
 import productRoutes from './routes/product.route.js';
 import couponRoutes from './routes/coupon.route.js';
import cartRouts from './routes/cart.route.js';
import paymentRouts from './routes/payment.route.js';
 import cookieParser from 'cookie-parser';
dotenv.config()
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRouts)
app.use('/api/coupon', couponRoutes)
app.use('/api/payments', paymentRouts)
// Importing routes

const PORT=process.env.PORT || 3000;
app.listen(PORT, connectDB(), ()=>console.log(`the server is runing on http:/localhost : ${PORT}`));