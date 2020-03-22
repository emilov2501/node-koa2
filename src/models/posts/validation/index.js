import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export function postValidation (body) {
  function validation () {
    const schema = {
      title: Joi.string().max(100).required(),
      description: Joi.string(),
      isPublished: Joi.boolean(),
      authorId: Joi.objectId()
    };

    return Joi.validate(body, schema);
  }

  const { error } = validation();
  return error ? error.details[0].message : '';
};
