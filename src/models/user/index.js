import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from 'config';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

userSchema.statics.generateToken = function(user) {
  if (!user) return console.error('User is not defined');

  return jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
}

const User = new mongoose.model('User', userSchema);

export default User;
