const Product = require("../models/Product");
const createProduct = async (req, res) => {
   //    const product = new Product(req.body);
   //    await product.save();

   try {
      console.log(req.body);
      res.status(201).json({
         success: true,
         message: "Product created successfully",
      });
   } catch (error) {
      // handle error

      res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};

const updateProduct = async (req, res) => {};

const getProduct = async (req, res) => {};

// delete product
const deleteProduct = async (req, res) => {};

module.exports = {
   createProduct,
   deleteProduct,
   updateProduct,
   getProduct,
};
