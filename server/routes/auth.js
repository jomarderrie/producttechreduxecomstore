const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, authenticateTokenJwtUser} = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser, createUser, login, authenticateToken} = require("../controllers/auth");
const {check} = require("express-validator");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

router.post("/jwt-user", authenticateTokenJwtUser,authenticateToken)
router.post("/create-user", createUser)

router.post("/login", login)


module.exports = router;
