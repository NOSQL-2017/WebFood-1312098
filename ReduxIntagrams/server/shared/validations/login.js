import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.identifier)) {
    errors.identifier = 'Không được bỏ trống ô này';
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'Không được bỏ trống ô này';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
