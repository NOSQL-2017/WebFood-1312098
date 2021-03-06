import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import {browserHistory} from 'react-router';

let LoginForm = React.createClass( {
  getInitialState() {
    return  {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };
  },

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  },

  onSubmit(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      dispatch(login(this.state)).then(
        (res) => browserHistory.push('/'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  },

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  },

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Tên đăng nhập"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Mật khẩu"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
})


module.exports = connect( state => {
  return state;
})(LoginForm);
