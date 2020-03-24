import Joi, { func } from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export function commentValidation(body) {
  function validate() {
    const schema = {
      postId: Joi.objectId().required(),
      authorId: Joi.objectId().required(),
      body: Joi.string().required()
    };
    
    return Joi.validate(body, schema)
  };

  const { error } = validate();
  return error ? error.details[0].messages : ''
};
