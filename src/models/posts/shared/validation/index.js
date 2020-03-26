import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export function sharedPostValidation (body) {
  function validate() {
    const schema = {
      postId: Joi.objectId()
    };

    return Joi.validate(body, schema)
  };

  const { error } = validate();
  return error ? error.details[0].messages : ''
}
