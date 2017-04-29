var React = require('react');
var Suggestion = require('suggestion');
var {connect} = require('react-redux');
var actions = require('actions');
var Home = require('home');
var Content = React.createClass({
    componentWillMount: function() {
        var {dispatch, nguoidung, giaodien} = this.props;
        if (nguoidung.isLogin == false && giaodien == true) {
            dispatch(actions.doiGiaoDien());
        }
    },
    render: function() {
        var {dispatch, nguoidung, giaodien} = this.props;
        var loadContent = function() {
            if (nguoidung.isLogin === true) {
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