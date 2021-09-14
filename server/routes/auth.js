const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser, createUser, login} = require("../controllers/auth");
const {check} = require("express-validator");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

router.post("/create-user", createUser)

router.post("/login", login)

module.exports = router;
