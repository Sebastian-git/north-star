// Initialize global variables
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const axios = require("axios");

// Handles search results
router.post("/", (req, res) => {
  const maxDate = req.body.max;
  const minDate = req.body.min;
  const config = {
    method: "get",
    url: `https://ssd-api.jpl.nasa.gov/fireball.api?date-min=${minDate}&date-max=${maxDate}`,
    navs: { }
  }
  axios(config)
  // If request works
  .then(response => {
    // Add date, energy, velocity, longitude and latitude into array as a string
    let currentData = []; 
    for (let i = 0; i < response.data.count; i++) {
      currentData.push([response.data.data[i][0], response.data.data[i][1], response.data.data[i][8], response.data.data[i][5], response.data.data[i][3], " "]);
    }
    fieldData = ["DATE", "ENG", "ALT", "LON", "LAT", "FAV"];
    // Push current data array to front end each loop
    res.render("index", {currentData, fieldData});
  })
  // Otherwise
  .catch(error => {
    console.log(error);
  });
});

router.post("/favorite", (req, res) => {
  console.log(req.body.favorites, " Favorites");
  firebase.doSaveFireball(req.body.favorites)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error, " fav error");
  })
})

module.exports = router;