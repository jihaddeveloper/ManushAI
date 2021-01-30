//  Author: Mohammad Jihad Hossain
//  Create Date: 30/01/2021
//  Modify Date: 30/01/2021
//  Description: Main entry file for rest api project for ManushAI

//  Library imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

//Main Application
const app = express();

//Passport config
require("./config/passport");

//Secret tokens
const secret = require("./config/secret");

//Headers For API Accessing
app.use(cors());

//Route Controller imports
const userController = require("./routes/api/userController");
const itemController = require("./routes/api/itemController");
const orderController = require("./routes/api/orderController");


//Setup static folder for images and files
app.use("/uploads", express.static("uploads"));

//Bodyparser Middleware to read from from data
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//To read raw json input.
app.use(bodyParser.json());

//To see the executed url
app.use(morgan("dev"));

//MongoDB Connection
mongoose
  .connect(secret.mongoURI)
  .then(() => console.log("Conntected to MongoDB"))
  .catch(err => console.log(err));

//Entry point of the Application
app.get("/", (req, res) => res.send("Hello World"));

//Using route controller
app.use("/api/user", cors(), userController);
app.use("/api/item", cors(), itemController);
app.use("/api/order", cors(), orderController);


//Server startup
app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log(`Server is Running on http://localhost:${secret.port}/`);
});
