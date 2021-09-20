const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, authenticateTokenJwtUser} = require("../middlewares/auth");
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require("../controllers/user");
const {authenticateToken} = require("../controllers/auth");

router.post("/user/cart", authenticateTokenJwtUser ,userCart); // save cart
router.get("/user/cart", authenticateTokenJwtUser, getUserCart); // get cart
router.delete("/user/cart", authenticateTokenJwtUser, emptyCart); // empty cart
router.post("/user/address", authenticateTokenJwtUser, saveAddress);

router.post("/user/order", authenticateTokenJwtUser, createOrder); // stripe
router.post("/user/cash-order", authenticateTokenJwtUser, createCashOrder); // cod
router.get("/user/orders", authenticateTokenJwtUser, orders);

// coupon
router.post("/user/cart/coupon", authenticateTokenJwtUser, applyCouponToUserCart);

// wishlist
router.post("/user/wishlist", authenticateTokenJwtUser, addToWishlist);
router.get("/user/wishlist", authenticateTokenJwtUser, wishlist);
router.put("/user/wishlist/:productId", authenticateTokenJwtUser, removeFromWishlist);

router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit user API endpoint",
  });
});

module.exports = router;
