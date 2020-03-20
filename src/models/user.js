import mongoose from 'mongoose';
import Joi from 'joi';

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


const User = new mongoose.model('User', userSchema);

function validation(body) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(8).required()
  }

  return Joi.validate(body, schema)
}

module.exports = {
  User,
  validation
};