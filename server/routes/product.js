const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, authenticateTokenJwtUser } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require("../controllers/product");

// routes
router.post("/product", authenticateTokenJwtUser, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug",  authenticateTokenJwtUser, remove);
router.get("/product/:slug", read);
router.put("/product/:slug",  authenticateTokenJwtUser, update);

router.post("/products", list);
// rating
router.put("/product/star/:productId", authenticateTokenJwtUser, productStar);
// related
router.get("/product/related/:productId", listRelated);
// search
router.post("/search/filters", searchFilters);

module.exports = router;
