const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Game = Schema.Game,
    User = Schema.User;

const BadgeSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  game: {
    type: ObjectId,
    ref: "Game"
  },
  minPoints: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  },
  url: {
    type: String
  },
  public: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Badge = mongoose.model('Badge', BadgeSchema);

module.exports = Badge;

module.exports.getBadges = (callback) => {
  Badge.find({}, callback).populate('createdBy');
}
