const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  // author: {
  //   type: Types.Relationship,
  //   ref: 'User',
  //   index: true
  // },
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
  author: {
    type: Boolean,
    default: false
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
  Game.find({}, callback);
}

module.exports.getGameDetails = (vanityUrl, callback) => {
  Game.findOne({vanityUrl: vanityUrl}, callback);
}
