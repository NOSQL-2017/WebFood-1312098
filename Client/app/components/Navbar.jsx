var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');


var Nav = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        console.log(nextProps.button);
    },
    render: function() {
        var {button, dispatch, login} = this.props;
        var LoadChucNangDangNhap = () => {
            console.log('Login navbar: ', login.isLogin)
            if (login.isLogin === 1) {
               return ( 
                <ul className="main-nav">
                    <li onClick={
                        () => {
                            dispatch(actions.resetLogin());
                            dispatch(actions.resetButton());
                            dispatch(actions.resetButtonFunc());
                        }

                    }> <Link to="/" >Đăng xuất</Link></li>
                </ul> 
               )
            }
            if (button === 0) {
                return (
                    <ul className="main-nav">
                        <li onClick={() => {dispatch(actions.pressSignup())}}> <Link to="/signup" >Đăng kí</Link></li> 
                        <li onClick={() => {dispatch(actions.pressLogin())}}> <Link to="/login" >Đăng nhập</Link></li>
                    </ul>                  
                )
            } 
            if (button === 1) {
                return (
                   <ul className="main-nav">
                        <li onClick={() => {dispatch(actions.pressSignup())}}> <Link to="/signup" >Đăng ký</Link></li> 
                    </ul>  
                )
            }

            if (button === 2) {
                return (
                   <ul className="main-nav">
                        <li onClick={() => {dispatch(actions.pressLogin())}}> <Link to="/login" >Đăng nhập</Link></li>
                    </ul>  
                )

            }
        }
        var LoadFuncAfterLogin = function() {
            if(login.isLogin === 1) {
                return (
                     <ul className="main-nav">
                        <li> <Link to="/">Trang chủ</Link></li>
                        <li><Link to="/followers" >Tìm bạn bè</Link></li>              
                        <li> <Link to="/uploadimage" >Đăng ảnh</Link></li>
                        <li> <Link to="/myimages" >Ảnh của tôi</Link></li>
                    </ul>
                )
            }
        }
        return (
            <div className="row ">
                    <img src="resources/img/logo2.png" alt="logo" className="logo"/>  
                    {LoadChucNangDangNhap()}
                    {LoadFuncAfterLogin()}
            </div>
        )
    }
})

module.exports = connect(
    (state) => {
        return state;
    }
)(Nav);