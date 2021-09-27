const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, authenticateTokenJwtUser} = require("../middlewares/auth");

// controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", authenticateTokenJwtUser, adminCheck, upload);
router.post("/removeimage", authenticateTokenJwtUser, adminCheck, remove);

module.exports = router;
