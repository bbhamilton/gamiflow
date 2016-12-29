const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const router = {
  router: express.Router(),
  locals: app.locals
}

module.exports = router;

// database
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gamiflow');

// routing
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

var sessionStore = new session.MemoryStore;

// body parser basic config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// flash, cookies, sessions basic config
app.use(cookieParser('gamiflow'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: 'gamiflow'
}));
app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_flash = req.flash('success');
  res.locals.error_flash = req.flash('error');
  res.locals.warning_flash = req.flash('warning');
  res.locals.info_flash = req.flash('info');
  next();
})

// passport init
app.use(passport.initialize());
app.use(passport.session());

// PUG enging template config
app.set('view engine', 'pug');
app.set('views', './templates');

// PUG cache disabled
app.disable('view cache');

app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// serve files from public/
app.use(express.static(__dirname + '/public'));

// set port
app.set('port', (process.env.PORT || 7777));

// launch server on 7777
app.listen(app.get('port'), () => {
  console.log('Gamiflow is running...')
})
