const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const LogSchema = mongoose.Schema({
  game: {
    type: ObjectId,
    ref: 'Game'
  },
  type: {
    type: ObjectId,
    ref: 'LogType'
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  badge: {
    type: ObjectId,
    ref: 'Badge'
  },
  points: {
    type: Number
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;

module.exports.getLogs = (callback) => {
  Log.find({}, callback).populate('user game badge');
}
