import express from "express";
const router = express.Router()
import {createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, findOrderById, markOrderAsPaid, markOrderAsDelivered} from '../controllers/orderController.js'

import {authenticate, authorizedAdmin,  } from '../middleware/authMiddleware.js'

router.route('/').post(authenticate, createOrder).get(authenticate, authorizedAdmin, getAllOrders);
router.route("/mine").get(authenticate, getUserOrders)
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router.route("/:id/deliver").put(authenticate, authorizedAdmin, markOrderAsDelivered);

export default router;