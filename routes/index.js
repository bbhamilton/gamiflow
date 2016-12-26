const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {

    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return done(null, false, {message: 'Unknown user'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });

    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(null, user);
  });
});

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
    });

    req.flash('success_msg', 'You are signed up. Please log in.');
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
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }), (req, res) => {
    res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
