const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("../controllers/stripe");
const { route } = require("./user");
// middleware
const { authCheck, authenticateTokenJwtUser} = require("../middlewares/auth");
const {authenticateToken} = require("../controllers/auth");

router.post("/create-payment-intent", authenticateTokenJwtUser,createPaymentIntent);

module.exports = router;
