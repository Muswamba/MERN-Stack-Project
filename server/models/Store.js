const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
   storeName: {
      type: String,
      required: true,
   },
   seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   logo: {
      type: String,
      required: false,
   },
   description: {
      type: String,
      required: false,
   },
   categories: {
      type: [String],
      required: false,
   },
   performance: {
      type: Map,
      required: false,
      of: Number,
      default: {},
   },
   scores: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
   },
   isActive: {
      type: Boolean,
      default: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

// exports
module.exports = mongoose.model("Store", storeSchema);
