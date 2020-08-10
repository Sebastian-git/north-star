// Import and initialize all required libraries
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Set ejs as default view engine and set /public as the default directory
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res) {
  res.render("index");
  console.log(req.ip);
});

// Start express/nodemon server
app.listen(5000);