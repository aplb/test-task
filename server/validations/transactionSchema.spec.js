const Joi = require('joi');
const { validations } = require('config');
const {
  createTransaction,
  getSingleTransaction,
} = require('./transactionSchema');

describe('transaction schema', () => {
  let form;
  beforeEach(() => {
    form = {
      type: 'debit',
      amount: 100,
    };
  });

  ['debit', 'credit'].forEach(typeName => {
    test(`should pass ${typeName}-type`, () => {
      form.type = typeName;

      expect(Joi.validate(form, createTransaction)).toEqual(
        expect.objectContaining({
          value: form,
          error: null,
        })
      );
    });
  });

  test('should fail unknown type', () => {
    form.type = 'test';
    expect(Joi.validate(form, createTransaction).error).not.toEqual(null);
  });

  [0, -1].forEach(amout => {
    test(`should fail below min amount`, () => {
      form.amount = amout;
      expect(Joi.validate(form, createTransaction).error).not.toEqual(null);
    });
  });

  test('should fail above max amount', () => {
    form.amount = validations.transaction.maxAmount + 1;
    expect(Joi.validate(form, createTransaction).error).not.toEqual(null);
  });

  test('should pass with valid uuid', () => {
    let params = { id: '97d6a157-5f61-45f5-8543-40f9d67e7fd6' };
    expect(Joi.validate(params, getSingleTransaction)).toEqual(
      expect.objectContaining({
        value: params,
        error: null,
      })
    );
  });

  test('should fail without params.id as uuid', () => {
    let params = { id: '5f61-45f5-8543-40f9d67e7fd6' };
    expect(Joi.validate(params, getSingleTransaction).error).not.toEqual(null);
  });
});
