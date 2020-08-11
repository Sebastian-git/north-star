// Import and initialize all required libraries
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Set ejs as default view engine and set /public as the default directory
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Redirect to home page
app.get("/", function(req, res) {
  res.render("index");
  console.log(req.ip);
});

// Handles search results
app.post("/", urlencodedParser, function(req, res) {
  console.log(req.body.min + " and " + req.body.max);
  const maxDate = req.body.max;
  const minDate = req.body.min;
  console.log(minDate);
  const config = {
    method: "get",
    url: `https://ssd-api.jpl.nasa.gov/fireball.api?date-min=${minDate}&date-max=${maxDate}`,
    headers: { }
  }
  axios(config)
  // If request works
  .then(response => {
    let currentData = [];
    // Add date, energy, velocity, longitude and latitude into array as a string
    for (let i = 0; i < response.data.count; i++) {
      currentData = [response.data.data[i][0], response.data.data[i][1], response.data.data[i][8], response.data.data[i][5], response.data.data[i][3]];
    }
    // Push current data array to front end each loop
    res.render("index", {currentData});
  })
  // Otherwise
  .catch(error => {
    console.log(error);
  });
});

// Start express/nodemon server
app.listen(5000);