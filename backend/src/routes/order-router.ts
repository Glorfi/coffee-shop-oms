import express from "express";
import { placeOrder } from "../controllers/orders.js";

const orderRouter = express.Router()

orderRouter.get('/', (req, res) =>  res.send("ORDERS HERE BLYAT!"))
orderRouter.post('/', placeOrder)

export default orderRouter