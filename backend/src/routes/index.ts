import express from 'express';
import drinksRouter from './drinks-router.js';

import categoryRouter from './category-router.js';
import orderRouter from './order-router.js';

export const router = express.Router();

router.use('/drinks', drinksRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
