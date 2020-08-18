// Initialize global variables
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');

// Get home page
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Movie App', error: req.app.locals.err });
});

// Post signup account info
router.post('/signup', (req, res) => {
  firebase.doCreateUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(authUser => {
      firebase.doCreateUser(authUser.user.uid, {
        email: req.body.email,
        username: req.body.username
      }).then(snapShot => {
        res.redirect(`/`)
      }).catch(err => {
        //console.log(err, "ERROR MSG")
      })
    }).catch(err => {
      req.app.locals.err = err.message
      res.redirect('/')
    })
})

router.get('/signup', async (req, res) => {
  const user = await firebase.doGetUser(req.params.id)
  res.render('users/show', {
    user: user.data()
  })
})

module.exports = router;