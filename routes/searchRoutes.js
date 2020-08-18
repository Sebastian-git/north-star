// Initialize global variables
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const axios = require("axios");

// Handles search results
router.post("/searchResults", (req, res) => {
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

router.post("/favorite", (req, res) => {
  console.log(req.body);
})

module.exports = router;