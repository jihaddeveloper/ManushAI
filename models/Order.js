//  Author: Mohammad Jihad Hossain
//  Create Date: 29/01/2021
//  Modify Date: 30/001/2021
//  Description: Order model file

//Imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Sechema defination
const OrderSchema = new Schema({
  orderId: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
  totalItem: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

//Exporting model
module.exports = mongoose.model("Order", OrderSchema, "orders");
