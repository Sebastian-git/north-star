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
    url: `https://ssd-api.jpl.nasa.gov/fireball.api?date-min=${minDate}`,
    headers: { }
  }
  axios(config)
  // If request works
  .then(response => {
    const date = response.data.data[0][0]; // Date of peak brightness
    const energy = response.data.data[0][1]; // Approximate total radiated energy in joules
    const vel = response.data.data[0][8]; // Velocity at peak brightness
    const lat = response.data.data[0][3]; // Latitude at peak brightness (degrees)
    const lon = response.data.data[0][5]; // Longitude at peak brightness (degrees)
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