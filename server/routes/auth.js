const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, authenticateTokenJwtUser} = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser, createUser, login, authenticateToken, updatePassword} = require("../controllers/auth");
const {check} = require("express-validator");

router.post("/create-or-update-user", authenticateTokenJwtUser, createUser);
router.post("/current-user", authCheck, authenticateTokenJwtUser);
router.post("/current-admin", authenticateTokenJwtUser, adminCheck);

router.post("/jwt-user", authenticateTokenJwtUser,authenticateToken)
router.post("/create-user", createUser)

router.post("/login", login)

router.post("/update-password", authenticateTokenJwtUser, updatePassword)

module.exports = router;
