// Initialize global variables
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const axios = require("axios");

// Handles search results
router.get("/", (req, res) => {
    firebase.doGetFireball(req.session.user.email)
    .then( collection => {
        let fireballsArray = [["DATE", "ENG", "ALT", "LON", "LAT"]];
        collection.data().fireball.forEach((item) => {
            fireballsArray.push(item.split(","));
        })
        res.render("favorites", {fireballs: fireballsArray});
    }).catch((e) => {
        console.log(e, " favorite routes");
    })
});

// Allows imports
module.exports = router;