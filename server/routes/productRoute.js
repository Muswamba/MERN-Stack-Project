const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const {
   createProduct,
   updateProduct,
   deleteProduct,
   getProduct,
} = require("../controllers/productController");

// routes
router.post("/create", authenticate, createProduct);
router.put("/update/:id", authenticate, updateProduct);
router.delete("/delete/:id", authenticate, deleteProduct);
router.get("/product/:id", getProduct);
// exports
module.exports = router;
