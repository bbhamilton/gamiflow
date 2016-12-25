const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  email: {
    type: String
  },
  password: {
    type: String
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
