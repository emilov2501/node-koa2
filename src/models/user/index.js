import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from 'config';

const Schema = mongoose.Schema;

const EXPIRES_IN_MINUTES = '1440m';
const JWT_PRIVATE_KEY = config.get('JWT_PRIVATE_KEY');

export const userSchema = new Schema({
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
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.statics.generateToken = function(payload) {
  return jwt.sign(payload, JWT_PRIVATE_KEY, {
    expiresIn: EXPIRES_IN_MINUTES
  });
}

const User = new mongoose.model('User', userSchema);

export default User;
