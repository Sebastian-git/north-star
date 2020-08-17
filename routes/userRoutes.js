<<<<<<< HEAD
// Initialize global variables
=======
// Create global variables
>>>>>>> 39ca7436df5d534e1fcd9be58c1e013ef1ce5988
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase')

// Get home page
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Movie App', error: req.app.locals.err });
});

<<<<<<< HEAD
// Post signup account info
=======
// Reroute after you sign in
>>>>>>> 39ca7436df5d534e1fcd9be58c1e013ef1ce5988
router.post('/signup', (req, res) => {
  firebase.doCreateUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(authUser => {
      console.log(authUser.user.uid, "User ID")
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

router.get('/user/signup', async (req, res) => {
  console.log(req.params.id, "im here")
  const user = await firebase.doGetUser(req.params.id)
  res.render('users/show', {
    user: user.data()
  })
})


module.exports = router;