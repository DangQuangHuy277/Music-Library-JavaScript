const Joi = require('joi');

module.exports = (reqPayload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(reqPayload);
};
