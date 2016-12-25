const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password1 = req.body.password1;
  let password2 = req.body.password2;

  req.checkBody('username', 'Name is required.').notEmpty();
  req.checkBody('email', 'Email is required.').notEmpty().isEmail();
  req.checkBody('password1', 'Password is required.').notEmpty();
  req.checkBody('password2', 'Password doesn\'t match.').equals(req.body.password1);

  var errors = req.validationErrors();

  if(errors) {
    res.render('register', {
      errors: errors
    });
  } else {

    let newUser = new User({
      username: username,
      email: email,
      password: password1
    });

    User.createUser(newUser, (err, user) => {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are signed up. Please log in.');
    res.redirect('/');
  }

});

router.get('/games', (req, res) => {
  res.render('games');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login'
  }), (req, res) => {
    res.redirect('/');
});

module.exports = router;
