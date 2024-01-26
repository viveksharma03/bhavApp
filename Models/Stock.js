const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
    },
    name: {
      type: String,
    },
    open: {
      type: mongoose.Types.Decimal128,
    },
    high: {
      type: mongoose.Types.Decimal128,
    },
    low: {
      type: mongoose.Types.Decimal128,
    },
    close: {
      type: mongoose.Types.Decimal128,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
