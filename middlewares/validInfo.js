const Joi = require("joi");

function validInfo(req, res, next) {
  const schemaRegister = Joi.object({
    name: Joi.string().min(3).required().label("Your name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });
  const schemaLogin = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });

  if (req.path === "/register") {
    const { error } = schemaRegister.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  } else if (req.path === "/login") {
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  }

  next();
}

module.exports = validInfo;
