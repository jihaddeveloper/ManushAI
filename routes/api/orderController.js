//  Author: Mohammad Jihad Hossain
//  Create Date: 30/01/2021
//  Modify Date: 30/01/2021
//  Description: Order controller and route file

//  Library imports
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Import secret file
const config = require("../../config/secret");

//Import model
const Item = require("../../models/Item");
const Order = require("../../models/Order");
const User = require("../../models/User");

// @route   POST http://localhost:9000/api/order/create
// @desc    Create order
// @access  Private
router.post(
  "/create/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res, next) => {
    let quantity = 1;

    //Find the product to be added to cart
    const foundItem = await Item.find({
      _id: req.params.id,
    });

    console.log(foundItem);

    //Add item to order
    order = new Order({
      user: req.user,
      item: foundItem._id,
      quantity: quantity,
      unitPrice: parseFloat(foundItem.price),
      price: parseFloat(foundItem.price) * parseFloat(quantity),
      subtotal: parseFloat(foundItem.price) * parseFloat(quantity),
    });

    order.save()
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(404).json(err));;
  }
);

// @route   POST http://localhost:9000/api/order/confirm
// @desc    Confirm order
// @access  Private
router.post(
  "/confirm",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {}
);

//Export
module.exports = router;
