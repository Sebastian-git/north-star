// Initialize global variables
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const axios = require("axios");

// Handles search results
router.get("/", (req, res) => {
    firebase.doGetFireball(req.session.user.email)
    .then( collection => {
        res.render("favorites", {fireballs: collection.data().fireball});
    }).catch((e) => {
        console.log(e, " favorite routes");
    })
});

// Allows imports
module.exports = router;