//  Author: Mohammad Jihad Hossain
//  Create Date: 30/01/2021
//  Modify Date: 30/01/2021
//  Description: Item model file

//Imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Sechema defination
const ItemSchema = new Schema({
  name: {
    type: String,
  },
  price: { type: Number },
  about: { type: String },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

//Exporting model
module.exports = mongoose.model("Item", ItemSchema, "items");
