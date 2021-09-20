const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, authenticateTokenJwtUser} = require("../middlewares/auth");

const { orders, orderStatus } = require("../controllers/admin");

// routes
router.get("/admin/orders", authenticateTokenJwtUser, adminCheck, orders);
router.put("/admin/order-status", authenticateTokenJwtUser, adminCheck, orderStatus);

module.exports = router;
