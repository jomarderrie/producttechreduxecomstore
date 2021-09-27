const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, authenticateTokenJwtUser} = require("../middlewares/auth");

// controller
const { create, remove, list } = require("../controllers/coupon");

// routes
router.post("/coupon", authenticateTokenJwtUser, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authenticateTokenJwtUser, adminCheck, remove);

module.exports = router;
