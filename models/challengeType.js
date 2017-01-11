const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ChallengeTypeSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const ChallengeType = mongoose.model('ChallengeType', ChallengeTypeSchema);

module.exports = ChallengeType;

module.exports.getChallengeTypes = (callback) => {
  ChallengeType.find({}, callback);
}
