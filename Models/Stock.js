const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    code: {
        type: Number,
       // required: true
    },
    name: {
        type: String,
       // required: true
    },
    open: {
        type: mongoose.Types.Decimal128,
       // required: true
    },
    high: {
        type: mongoose.Types.Decimal128,
       // required: true
    },
    low: {
        type: mongoose.Types.Decimal128,
       // required: true
    },
    close: {
        type: mongoose.Types.Decimal128,
       // required: true
    },
},
    { timestamps: true },
);

const Stock = mongoose.model("Stock", stockSchema)

module.exports = Stock
