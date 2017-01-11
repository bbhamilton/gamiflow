const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const LogTypeSchema = mongoose.Schema({
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

const LogType = mongoose.model('LogType', LogTypeSchema);

module.exports = LogType;

module.exports.getLogTypes = (callback) => {
  LogType.find({}, callback);
}
