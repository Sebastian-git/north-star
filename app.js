// Import and initialize all required libraries
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { Router } = require("express");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Set ejs as default view engine and set /public as the default directory
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Redirect to home page
app.get("/", function(req, res) {
  res.render("index");
});

// Handles search results
app.post("/", urlencodedParser, function(req, res) {
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
      currentData.push(`${response.data.data[i][0]}, ${response.data.data[i][1]}, ${response.data.data[i][8]}, ${response.data.data[i][5]}, ${response.data.data[i][3]}`);
    }
    console.log(currentData);
    // Push current data array to front end each loop
    res.render("index", {currentData : currentData});
  })
  // Otherwise
  .catch(error => {
    console.log(error);
  });
});

// Start express/nodemon server
app.listen(5000);