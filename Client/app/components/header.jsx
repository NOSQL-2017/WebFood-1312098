var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux')
var Nav = require('Navbar');

var Header = React.createClass({
    render: function() {
        var {dispatch, nguoidung, giaodien} = this.props;

        var loadTitle = function() {
            if (nguoidung.isLogin == false && giaodien == false) {
                return (
                   <h1>Còn trẻ mà không đi đó đi đây<br/> thì bạn định chờ đến bao giờ nữa.</h1> 
                )
            }
        }
        return (
            <header className={ nguoidung.isLogin == true || giaodien == true ? "header-main-2" : "header-main"}>
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