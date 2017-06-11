import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
  if (Validator.isNull(data.username)) {
    errors.username = 'Không được bỏ trống ô này';
  }
  if (Validator.isNull(data.email)) {
    errors.email = 'Không được bỏ trống ô này';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email đã tồn tại';
  }
  if (Validator.isNull(data.password)) {
    errors.password = 'Không được bỏ trống ô này';
  }
  if (Validator.isNull(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Không được bỏ trống ô này';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Mật khẩu không trùng khớp';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
