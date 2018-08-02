const Joi = require('joi');
const { validations } = require('config');

module.exports = {
  options: {
    abortEarly: true,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
  createTransaction: Joi.object().keys({
    type: Joi.string()
      .trim()
      .valid(['debit', 'credit']),
    amount: Joi.number()
      .min(validations.transaction.minAmount)
      .max(validations.transaction.maxAmount),
  }),
};
