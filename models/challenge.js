const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Game = Schema.Game,
    User = Schema.User,
    ChallengeType = Schema.ChallengeType;

const ChallengeSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  game: {
    type: ObjectId,
    ref: 'Game'
  },
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  challengeType: {
    type: ObjectId,
    ref: 'ChallengeType'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;

module.exports.getChallenges = (callback) => {
  Challenge.find({}, callback).populate('game', 'createdBy');
}
