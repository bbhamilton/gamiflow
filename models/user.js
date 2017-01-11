const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Game = Schema.Game;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  name: {
    first: String,
    last: String
  },
  aboutMe: {
    type: String,
  },
  url: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  points: {
    general: { type: Number, default: 0 }
  },
  games: {
    followed: [{ type : ObjectId, ref: 'Game' }],
    created: [{ type : ObjectId, ref: 'Game' }],
    joined: [{ type : ObjectId, ref: 'Game' }],
    viewed: [{ type : ObjectId, ref: 'Game' }]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save(callback);
      });
    });
}

module.exports.getUsers = (callback) => {
  User.find({}, callback);
}


module.exports.getUserByUsername = (username, callback) => {
  User.findOne({username: username}, callback);

}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });

}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}
