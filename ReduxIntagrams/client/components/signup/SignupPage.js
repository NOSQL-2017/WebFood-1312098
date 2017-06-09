import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';

import { addFlashMessage } from '../../actions/flashMessages.js';

var SignupPage = React.createClass({

  render: function () {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            addFlashMessage={addFlashMessage} />
        </div>
      </div>
      )
    }
})


module.exports = connect(null)(SignupPage);