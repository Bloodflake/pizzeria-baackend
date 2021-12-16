const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    total_amount: {type: Number, required: true},
    status: {type: String, default: "placed"},
    items: [{product_id: {type: mongoose.Types.ObjectId, ref: "Menu", required: true}, quantity: {type: Number, required: true}}]
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);