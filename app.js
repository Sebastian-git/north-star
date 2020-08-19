// Import and initialize all required libraries
const express = require("express");
const session = require("express-session");
const { Router } = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const searchRouter = require("./routes/searchRoutes");
const database = require("./config/firebase.js");

// Set ejs as default view engine and set /public as the default directory
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));

// Use express session
app.use(
    session({
        secret: 'this is a random string secret',
        resave: false,
        saveUninitialized: false,
    }),
);

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
}); 

app.use("/register", userRouter);

// Redirect to home page
app.get("/", function(req, res) {
    res.render("index", {currentData: [], fieldData: []});
});
  
// Redirect to about page
app.get("/about", (req, res) => {
    res.render("about");
});

// Redirect to signup page
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Redirect to login
app.get("/login", (req, res) => {
    res.render("login");
});

// Redirect to search
app.get("/searchResults", function(req, res) {
    res.render("index", {currentData: [], fieldData: []});
});

app.use("/", searchRouter);

// Start express/nodemon server
app.listen(process.env.PORT || 5000);