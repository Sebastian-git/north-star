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
  let maxDate = req.body.max;
  let minDate = req.body.min;
  const config = {
    method: "get",
    url: `https://ssd-api.jpl.nasa.gov/fireball.api?date-min=${minDate}`,
    headers: { }
  }
  axios(config)
  // If request works
  .then(response => {
    console.log(JSON.stringify(response.data));
    res.render("index", {
    });
  })
  // Otherwise
  .catch(error => {
    console.log(error);
  });
  
});

// Start express/nodemon server
app.listen(5000);