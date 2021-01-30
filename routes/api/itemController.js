//  Author: Mohammad Jihad Hossain
//  Create Date: 30/01/2021
//  Modify Date: 30/01/2021
//  Description: Item controller and route file

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


// @route   POST http://localhost:9000/api/item/create
// @desc    Create item
// @access  Public
router.post("/create", (req, res) => {
    
    const newItem = new Item({
        name: req.body.name,
        price: req.body.price,
        about: req.body.about,
      });
  
      //Save new post
      newItem.save().then(item => res.json(item));
});

// @route   GET http://localhost:9000/api/item/all
// @desc    Get all item
// @access  Private
router.get("/all", passport.authenticate("jwt", {
  session: false,
}), async (req, res, next) => {
  await Item.find().then((items) => {
    //Check for User
    if (!items) {
      return res.status(404).json(errors);
    }

    return res.status(200).json(items);
  });
});

//Export
module.exports = router;