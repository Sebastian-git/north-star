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
    const date = response.data.data[0][0]; // Date of peak brightness
    const energy = response.data.data[0][1]; // Approximate total radiated energy in joules
    const vel = response.data.data[0][8]; // Velocity at peak brightness
    const lon = response.data.data[0][5]; // Longitude at peak brightness (degrees)
    const lat = response.data.data[0][3]; // Latitude at peak brightness (degrees)
    let currentData = [];
    for (let i = 0; i < response.data.count; i++) {
      currentData = [response.data.data[i][0], response.data.data[i][1], response.data.data[i][8], response.data.data[i][5], response.data.data[i][3]];
      // Push current data array to front end each loop
    }
    console.log("count: " + response.data.count);
    console.log(`Date: ${date}, Energy: ${energy}, Velocity: ${vel}, Latitude: ${lat}, Longitude: ${lon}`);
    res.render("index");
  })
  // Otherwise
  .catch(error => {
    console.log(error);
  });
});

// Start express/nodemon server
app.listen(5000);