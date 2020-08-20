// Initialize global variables
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');

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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  req.app.locals.err = '';
  firebase
    .doSignInWithEmailAndPassword(email, password)
    .then((authUser) => {
      req.session.user = {
        uid: authUser.user.uid,
        email: email,
      };
      res.redirect(`/`);
    })
    .catch((err) => {
      req.app.locals.err = err.message;
      res.redirect('/login');
    });
});

router.post("/logout", (req, res) => {
  console.log("CALLED LOGOUT");
  firebase.signOff();
  console.log("redirecting on userRoutes");
  res.redirect("/");
});

module.exports = router;