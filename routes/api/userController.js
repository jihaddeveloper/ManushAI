//  Author: Mohammad Jihad Hossain
//  Create Date: 30/01/2021
//  Modify Date: 29/01/2021
//  Description: User controller and route file

//  Library imports
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Import Input validator
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Import secret file
const config = require("../../config/secret");

//Import model
const User = require("../../models/User");

//Token generator
signToken = (user) => {
  //JWT payload
  const payload = {
    iss: "DevJihad",
    sub: user.id,
    id: user._id,
    name: user.name,
    avatar: user.avatar,
    iat: new Date().getTime(), //Current Time
    exp: new Date().setDate(new Date().getDate() + 1), // Expiration Time
  };

  //Retun Token
  return jwt.sign(payload, config.secretKey);
};

// @route   GET http://localhost:9000/api/user/all-user
// @desc    Get All User
// @access  Public
router.get("/all-user", async (req, res, next) => {
  await User.find().then((users) => {
    //Check for User
    if (!users) {
      return res.status(404).json(errors);
    }

    return res.status(400).json(users);
  });
});

// @route   POST http://localhost:9000/api/user/register
// @desc    Register User
// @access  Public
router.post("/register", async (req, res, next) => {
  //Set Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  await User.findOne({
    email: req.body.email,
  }).then((user) => {
    errors.email = "Email already exists";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm", //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
        deliveryAddress: req.body.deliveryAddress,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(404).json(err));
        });
      });
    }
  });
});

// @route   POST http://localhost:9000/api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User by email
  await User.findOne({
    email: email,
  }).then((user) => {
    //Check for User
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched

        // Generate Token
        const token = signToken(user);

        //Respond with token
        res.status(200).json({
          token: "Bearer " + token,
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET http://localhost:9000/api/user/current-user
// @desc    Return current user
// @access  Private
router.get(
  "/current-user",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

// @route   GET http://localhost:9000/api/user/logout
// @desc    Logout current user
// @access  Private
router.get(
  "/logout",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
    return res.status(200).json("logout successful");
  }
);

// @route   PUT http://localhost:9000/api/user/update/:id
// @desc    Update user information
// @access  Private
router.put(
  "/update/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res, next) => {
    //Set Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({
      _id: req.params.id,
    });


    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.deliveryAddress = req.body.deliveryAddress;

    //Save user with new information
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then((user) => res.status(200).json(user))
          .catch((err) => res.status(404).json(err));
      });
    });
  }
);

// @route   DELETE http://localhost:9000/api/user/:id
// @desc    Delete user with id
// @access  Private
router.delete("/:id", async (req, res, next) => {
  await User.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).json(err);
    }
    return res.status(200).json("Deleted successfully");
  });
});

//Export
module.exports = router;
