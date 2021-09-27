const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, authenticateTokenJwtUser} = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} = require("../controllers/category");

// routes
router.post("/category", authenticateTokenJwtUser, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authenticateTokenJwtUser, adminCheck, update);
router.delete("/category/:slug", authenticateTokenJwtUser, adminCheck, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;
