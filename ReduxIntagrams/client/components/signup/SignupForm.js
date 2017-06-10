import React from 'react';
import {connect} from 'react-redux';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import {browserHistory} from 'react-router';

var SignupForm = React.createClass({
  getInitialState: function () {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
  },
  onChange: function (e) {
    this.setState({ [e.target.name]: e.target.value });
  },
  isValid: function () {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  },
  checkUserExists: function (e) {
    let {dispatch} = this.props;
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      dispatch(isUserExists(val)).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  },
  onSubmit: function (e) {
    e.preventDefault();
    let {dispatch} = this.props;
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      dispatch(userSignupRequest(this.state)).then(
        () => {
          browserHistory.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  },
  render: function () {
    var { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

         <TextFieldGroup
          error={errors.username}
          label="Họ tên"
          onChange={this.onChange}
          value={this.state.name}
          field="name"
        />

        <TextFieldGroup
          error={errors.username}
          label="Tên đăng nhập"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Mật khẩu"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Xác nhận lại mật khẩu"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Đăng kí
          </button>
        </div>
      </form>
    );
  }

})

module.exports = connect(state => {
  return state;
})(SignupForm);
