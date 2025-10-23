const express = require("express");
const {
  createOrder,
  capturedPayment,
} = require("../../controllers/shop/order-contoller");

const router = express.Router();

router.post("/create", createOrder);

module.exports = router;
