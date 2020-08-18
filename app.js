// Import and initialize all required libraries
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { Router } = require("express");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
require("dotenv").config();
const userRouter = require("./routes/userRoutes");

// Set ejs as default view engine and set /public as the default directory
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/user", urlencodedParser, userRouter);

// Redirect to home page
app.get("/", function(req, res) {
  res.render("index", {currentData: [], fieldData: []});
});

// Handles search results
app.post("/", urlencodedParser, (req, res) => {
  const maxDate = req.body.max;
  const minDate = req.body.min;
  const config = {
    method: "get",
    url: `https://ssd-api.jpl.nasa.gov/fireball.api?date-min=${minDate}&date-max=${maxDate}`,
    headers: { }
  }
  axios(config)
  // If request works
  .then(response => {
    // Add date, energy, velocity, longitude and latitude into array as a string
    let currentData = [];
    for (let i = 0; i < response.data.count; i++) {
      currentData.push([response.data.data[i][0], response.data.data[i][1], response.data.data[i][8], response.data.data[i][5], response.data.data[i][3], " "]);
    }
    fieldData = ["Date/Time", "Energy", "Altitude", "Longitude", "Latitude", "Favorites"];
    // Push current data array to front end each loop
    res.render("index", {currentData, fieldData});
  })
  // Otherwise
  .catch(error => {
    console.log(error);
  });
});

// Redirect to about page
app.get("/about", (req, res) => {
  res.render("about");
});

// Redirect to signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Start express/nodemon server
app.listen(process.env.PORT || 5000, console.log("port is running on 5000"));