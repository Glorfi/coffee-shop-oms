import express from 'express';
import { getOrderById, placeOrder } from '../controllers/orders.js';

const orderRouter = express.Router();

orderRouter.get('/', (req, res) => res.send('ORDERS HERE BLYAT!'));
orderRouter.get('/:id', getOrderById);
orderRouter.post('/', placeOrder);

export default orderRouter;
