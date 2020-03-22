import Joi from 'joi';

// User Authorization
export function authValidation(body) {
  function validation () {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(8).required()
    }
  
    return Joi.validate(body, schema)
  }

  const { error } = validation();
  return error ? error.details[0].message : ''
}

// Register
export function registerValidation(body, message) {
  function validation () {
    const schema = {
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(8).required()
    }
  
    return Joi.validate(body, schema)
  }

  const { error } = validation();
  return error ? error.details[0].message : ''
}
