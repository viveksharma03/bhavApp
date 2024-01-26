const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema(
  {
    stockCode: {
      type: Number,
    },
    stockName: {
      type: String,
    },
  },
  { timestamps: true }
);

const favouriteStock = mongoose.model("favourite", favouriteSchema);

module.exports = favouriteStock;
