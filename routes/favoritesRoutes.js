// Initialize global variables
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const axios = require("axios");

// Handles search results
router.get("/", (req, res) => {
    firebase.doGetFireball(req.session.user.email)
    .then( collection => {
        console.log(collection.data());
    }).catch((e) => {
        console.log(e, " IS ERROR");
    })
    res.render("favorites");
});

module.exports = router;