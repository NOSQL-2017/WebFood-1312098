var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux')
var Nav = require('Navbar');

var Header = React.createClass({
    render: function() {
        var {button, buttonFunc, login} = this.props;
        console.log(button);

        var loadTitle = function() {
            if (button === 0 && buttonFunc === 0 && login.isLogin !== 1) {
                return (
                   <h1>Còn trẻ mà không đi đó đi đây<br/> thì bạn định chờ đến bao giờ nữa.</h1> 
                )
            }
        }
        return (
            <header className={ (button === 0 && buttonFunc === 0 && login.isLogin !== 1)  ? "header-main" : "header-main-2"}>
                <Nav />
                <div className="hero-text-box">
                        {loadTitle()}
                </div>
            </header>
        )
    }
})

module.exports = connect(
    (state) => {
        return state;
    }
)(Header);