import React from 'react';
import LoginForm from './LoginForm';

let LoginPage = React.createClass({
  
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    );
  }
})

module.exports = LoginPage;
