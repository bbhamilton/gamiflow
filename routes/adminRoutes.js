var app = require('../index');

const User = require('../models/user');
const Game = require('../models/game');
const Badge = require('../models/badge');
const Challenge = require('../models/challenge');
const ChallengeType = require('../models/challengeType');
const LogType = require('../models/log-type');
const Log = require('../models/log');
const UserLevel = require('../models/user-level');

const routerHelper = require('./routerHelper');
const path = require('path');

var router = app.router;

router.get('/admin/', routerHelper.ensureAuthenticated, routerHelper.isAdmin, (req, res) => {
  res.render(path.join(path.resolve("."), '/templates/admin/dashboard'));
});

router.get('/admin/users', (req, res) => {
  User.getUsers((err, users) => {
    if(err) throw err;
    res.locals.users = users;
    res.render(path.join(path.resolve("."), '/templates/admin/users'));
  });
});

router.get('/admin/user-levels', (req, res) => {
  UserLevel.getUserLevels((err, userLevels) => {
    if(err) throw err;
    res.locals.userLevels = userLevels;
    res.render(path.join(path.resolve("."), '/templates/admin/user-levels'));
  });
});

router.get('/admin/games', (req, res) => {
  Game.getGames((err, games) => {
    if(err) throw err;
    res.locals.games = games;
    res.render(path.join(path.resolve("."), '/templates/admin/games'));
  });
});

router.get('/admin/challenges', (req, res) => {
  Challenge.getChallenges((err, challenges) => {
    if(err) throw err;
    res.locals.challenges = challenges;
    console.log(challenges);
    res.render(path.join(path.resolve("."), '/templates/admin/challenges'));
  });
});

router.get('/admin/challenge-types', (req, res) => {
  ChallengeType.getChallengeTypes((err, challengeTypes) => {
    if(err) throw err;
    res.locals.challengeTypes = challengeTypes;
    console.log(challengeTypes);
    res.render(path.join(path.resolve("."), '/templates/admin/challenge-types'));
  });
});

router.get('/admin/badges', (req, res) => {
  Badge.getBadges((err, badges) => {
    if(err) throw err;
    res.locals.badges = badges;
    res.render(path.join(path.resolve("."), '/templates/admin/badges'));
  });
});

router.get('/admin/add/:model', function (req, res) {

  let model = req.params.model || null;

  let template = null;

  if(model === null) {
    res.redirect('/404'); //TODO
  }

  switch(req.params.model) {
    case 'badge':
      template = 'badge-form';
      break;
    case 'challenge-type':
      template = 'challenge-type-form';
      break;
    case 'challenge':
      template = 'challenge-form';
      break;
    case 'game':
      template = 'game-form';
      break;
    case 'log-type':
      template = 'log-type-form';
      break;
    case 'log':
      template = 'log-form';
      break;
    case 'user-level':
      template = 'user-level-form';
      break;
    case 'user':
      template = 'user-form';
      break;
    default:
      res.redirect('/404');
  }

  if(template !== null) {
    res.locals.object = '1';//todo
    res.render(path.join(path.resolve("."), '/templates/admin/' + template));
  }

});

router.get('/admin/edit/:model', function (req, res) {

  let model = req.params.model || null;

  let template = null;

  if(model === null) {
    res.redirect('/404'); //TODO
  }

  switch(req.params.model) {
    case 'badge':
      template = 'badge-form';
      break;
    case 'challenge-type':
      template = 'challenge-type-form';
      break;
    case 'challenge':
      template = 'challenge-form';
      break;
    case 'game':
      template = 'game-form';
      break;
    case 'log-type':
      template = 'log-type-form';
      break;
    case 'log':
      template = 'log-form';
      break;
    case 'user-level':
      template = 'user-level-form';
      break;
    case 'user':
      template = 'user-form';
      break;
    default:
      res.redirect('/404');
  }

  if(template !== null) {
    res.locals.object = '1';//todo
    res.render(path.join(path.resolve("."), '/templates/admin/' + template));
  }

});

router.get('/admin/remove/:model', function (req, res) {
  res.render(path.join(path.resolve("."), '/templates/admin/badge-form'));
});

router.get('/admin/edit/:model', function (req, res) {
  res.render(path.join(path.resolve("."), '/templates/admin/badge-form'));
})



router.get('/admin/logs', (req, res) => {
  Log.getLogs((err, logs) => {
    if(err) throw err;
    res.locals.logs = logs;
    res.render(path.join(path.resolve("."), '/templates/admin/logs'));
  });
});

router.get('/admin/log-types', (req, res) => {
  LogType.getLogTypes((err, logTypes) => {
    if(err) throw err;
    res.locals.logTypes = logTypes;
    res.render(path.join(path.resolve("."), '/templates/admin/log-types'));
  });
});


module.exports = router;
