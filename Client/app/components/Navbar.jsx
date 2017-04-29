var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');


var Nav = React.createClass({
    handleClick: function() {
        var {dispatch} = this.props;
        dispatch(actions.dangXuat());
    },
    render: function() {
        var {nguoidung} = this.props;
        // var hienThiTenNguoiDung = function() {
        //     if (nguoidung.isLogin == true) {
        //         return <li><strong>Chào: </strong><h4>{nguoidung.tendangnhap}</h4></li>
        //     }
        // }
        var that = this;
        var hienThiChucNangDNTC = function() {
            if (nguoidung.isLogin == true) {
                return (
                    <ul className="main-nav">
                        <li> <Link to="/">Trang chủ</Link></li>
                        <li><Link to="/followers" >Tìm bạn bè</Link></li>              
                        <li> <Link to="/images" >Ảnh của tôi</Link></li>
                        <li><strong>Chào: </strong><h4>{nguoidung.tendangnhap}</h4></li>
                        <li onClick={that.handleClick}> <Link to="/" >Đăng Xuất</Link></li>
                    </ul>
                )
            } else if (nguoidung.isLogin == false) {
                return (
                     <ul className="main-nav">
                        <li> <Link to="/">Trang chủ</Link></li>
                        <li> <Link to="/signup" >Đăng kí</Link></li> 
                        <li> <Link to="/login" >Đăng nhập</Link></li>
                    </ul>
                )
            }
        }
        return (
            <div className="row ">
                    <img src="resources/img/logo2.png" alt="logo" className="logo"/>  
                     {hienThiChucNangDNTC()}
            </div>
        )
    }
})

module.exports = connect(
    (state) => {
        return state;
    }
)(Nav);