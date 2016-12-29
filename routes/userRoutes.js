var app = require('../index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
var router = app.router;

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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/', (req, res) => {
  console.log('/');
  res.render('index');
});

router.get('/create-game', (req, res) => {
  console.log('/create-game');
  res.render('create-game');
});

router.get('/register', (req, res) => {
  console.log('/register');
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

    req.flash('success', 'You are signed up. Please log in.');
    res.redirect('/');
  }

});

router.get('/games', (req, res) => {
  console.log('/games');
  res.render('games');
});

router.get('/profile', (req, res) => {
  console.log('/profile');
  app.locals.user = req.session.passport.user || null;
  if(app.locals.user) {
    res.render('profile');
  } else {
    req.flash('warning', 'You have to be logged in');
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  console.log('/login');
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    failureMessage: 'Something went wrong, please try again.',
    successFlash: true,
    failureMessage: 'You\'re logged in.'

  }));

router.get('/logout', function(req, res){
  console.log('/logout');

	req.logOut();
  app.locals.user = null;
	req.flash('success', 'You are logged out');
	res.redirect('/login');
});

module.exports = router;
