var app = require('../index');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const Game = require('../models/game');

const routerHelper = require('./routerHelper');
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

router.post('/create-game', (req, res) => {
  let name = req.body.name;
  let vanityUrl = req.body.vanityUrl;
  let description = req.body.description;
  let category = req.body.category;
  let userId = app.locals.user._id;

  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('vanityUrl', 'Vanity url is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();
  req.checkBody('category', 'Category is required.').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    res.render('create-game', {
      errors: errors
    });
  } else {

    console.log({
      name: name,
      author: userId,
      vanityUrl: vanityUrl,
      description: description,
      category: category
    });

    let newGame = new Game({
      name: name,
      author: userId,
      vanityUrl: vanityUrl,
      category: category,
      description: description
    });

    Game.createGame(newGame, (err, game) => {
      if(err) throw err;
    });

    req.flash('success', 'You\'ve created new game successfully!');
    res.redirect('/create-game');
  }
});

router.get('/user/:username', function (req, res) {
  User.getUserByUsername(req.params.username, (err, user) => {
    res.locals.user = user;
    res.render('user-public-profile');
  });
})

// router.get('/game/:vanityUrl', function (req, res) {
//   Game.getGameDetails(req.params.vanityUrl, (err, game) => {
//     res.locals.game = game;
//     res.render('game-details');
//   });
// })

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
    res.redirect('/login');
  }

});

router.get('/games', (req, res) => {
  Game.getGames((err, games) => {
    if(err) throw err;
    res.locals.games = games;
    res.render('games');

  });
});

router.get('/profile', routerHelper.ensureAuthenticated, (req, res) => {
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
  app.locals.redirect = req.query.redirect || '/profile';
  console.log('app.locals.redirect = ' + app.locals.redirect);
  res.render('login');
  //fff
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
