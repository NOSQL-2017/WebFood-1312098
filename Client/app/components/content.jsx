var React = require('react');
var Suggestion = require('suggestion');
var {connect} = require('react-redux');
var actions = require('actions');
var Home = require('home');
var Content = React.createClass({

    render: function() {
        var {dispatch, login} = this.props;
        var loadContent = function() {
            if (login.isLogin === 1) {
                return (
                    <Home />
                )
            } else {
                return (
                    < Suggestion />
                )
            }
        }
        return (
            <div>
                {loadContent()}
            </div>
        )
    }
});


module.exports = connect(
    (state) => {
        return state;
    }
)(Content);