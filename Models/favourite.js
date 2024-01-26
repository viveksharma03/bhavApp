const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
    favid: {
        type: Number,
       // required: true
    },
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

const favourite = mongoose.model("favourite", favouriteSchema)

module.exports = favourite
