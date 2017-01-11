const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Game = Schema.Game;

const UserLevelSchema = mongoose.Schema({
  game: {
    type : ObjectId,
    ref: 'Game'
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  level: {
    type: Number,
    default: 0
  },
  minPoints: {
    type: Number
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const UserLevel = mongoose.model('UserLevel', UserLevelSchema);

module.exports = UserLevel;

module.exports.getUserLevels = (callback) => {
    UserLevel.find({}, callback).populate('game');
}
