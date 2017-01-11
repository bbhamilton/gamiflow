const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    User = Schema.User,
    User = Schema.Challenge,
    User = Schema.Badge,
    User = Schema.UserLevel;

const GameSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  vanityUrl: {
    type: String,
  },
  description: {
    type: String
  },
  category: {
    type: Number
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  badges: [{ type : ObjectId, ref: 'Badge' }],
  challenges: [{ type : ObjectId, ref: 'Challenge' }],
  userLevels: [{ type : ObjectId, ref: 'UserLevel' }],
  author: {
    type: ObjectId,
    ref: 'User'
  },
  users: {
    players: [{ type : ObjectId, ref: 'User' }],
    followers: [{ type : ObjectId, ref: 'User' }]
  },
  private: {
    type: Boolean,
    default: true
  }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;

module.exports.createGame = (newGame, callback) => {
  newGame.save(callback);
}

module.exports.getGames = (callback) => {
  Game.find({}, callback).populate('author');
}

module.exports.getGameDetails = (vanityUrl, callback) => {
  Game.findOne({vanityUrl: vanityUrl}, callback);
}
