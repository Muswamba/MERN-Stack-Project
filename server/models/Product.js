const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   priceBefore: {
      type: Number,
      required: false,
   },
   price: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   stock: {
      type: Number,
      required: true,
      default: 0,
   },
   category: {
      type: String,
      required: true,
   },
   subcategory: {
      type: String,
      required: false,
   },
   imageUrl: {
      type: String,
      required: false,
   },
   store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
   },
   seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Product", ProductSchema);
