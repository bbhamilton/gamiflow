const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

// database
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gamiflow');

// routing
const routes = require('./routes/index');
const users = require('./routes/users');

// express
const app = express();

// passport init
app.use(passport.initialize());
app.use(passport.session());

// PUG enging template config
app.set('view engine', 'pug');
app.set('views', './templates');

// PUG cache disabled
app.disable('view cache');

app.use('/', routes);

// 404
// app.use(function (req, res, next) {
//   res.status(404).send('Sorry cant find that!');
// });

// body parser basic config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve files from public/
app.use(express.static(__dirname + '/public'));

// set port
app.set('port', (process.env.PORT || 7777));

// launch server on 7777
app.listen(app.get('port'), () => {
  console.log('Gamiflow is running...')
})
