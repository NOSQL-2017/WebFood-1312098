var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var { Router } = require('react-router');

import { browserHistory } from 'react-router';
var Signup = React.createClass({
    componentWillMount: function () {
        var {nguoidung, giaodien, dispatch} = this.props;
        if (giaodien === false) {
            dispatch(actions.doiGiaoDien())
        }
        if (nguoidung.dangky == 1) {
            browserHistory.push('/');
        }
    },
    componentWillUnmount: function () {
        var {dispatch} = this.props;
        dispatch(actions.doiGiaoDien())
    },
    componentWillReceiveProps: function (nextProps) {
        var {nguoidung} = nextProps;
        if (nguoidung.dangky == 1) {
            browserHistory.push('/');
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var { dispatch } = this.props;
        var tenDangNhap = this.refs.tendangnhap.value;
        var hoTen = this.refs.hoten.value;
        var  email = this.refs.email.value;
        var  matKhau = this.refs.matkhau.value;
        dispatch(actions.dangKy(tenDangNhap,hoTen,email,matKhau));
    },
    render: function () {
        var {nguoidung} = this.props;
        var hienThiThongBao = () => {
            if (nguoidung.kiemtra == true) {
                return ( <div data-closable className="callout alert-callout-subtle primary radius">
                    <strong>Yo!</strong> Kiểm tra tài khoản đăng ký....            
                </div>)
            } else if (nguoidung.dangky == 2) {
                return (
                    <div data-closable className="callout alert-callout-subtle alert">
                        <strong>Yo!</strong> Tên đăng nhập đã tồn tại 
                    </div>
                )
            }
        }
        return (
            <section className="section-signup">
                <div className="row">
                    <div className="column message">
                        {hienThiThongBao()}
                    </div>
                    <div className="column">
                        <div className="login-box">
                            <div className="row collapse expanded">
                                <div className="small-12 medium-6 column small-order-2 medium-order-1">
                                    <div className="login-box-form-section">
                                        <h1 className="login-box-title">Đăng ký</h1>
                                        <input className="login-box-input" ref="tendangnhap" type="text" name="username" placeholder="Tên đăng nhập" />
                                        <input className="login-box-input" ref="hoten" type="text" name="username" placeholder="Họ và tên" />
                                        <input className="login-box-input" ref="email" type="email" name="email" placeholder="E-mail" />
                                        <input className="login-box-input" ref="matkhau" type="password" name="password" placeholder="Mật khẩu" />
                                        <input className="login-box-submit-button" type="submit" name="signup_submit" value="Đăng ký ngay" onClick={this.handleSubmit} />
                                    </div>
                                    
                                </div>
                                <div className="small-12 medium-6 column small-order-1 medium-order-2 login-box-social-section">
                                    <div className="login-box-social-section-inner">
                                        <span className="login-box-social-headline">Sign in with<br />your social network</span>
                                        <a className="login-box-social-button-facebook">Log in with facebook</a>
                                        <a className="login-box-social-button-twitter">Log in with Twitter</a>
                                        <a className="login-box-social-button-google">Log in with Google+</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
});

module.exports = connect(
    (state) => {
        return state;
    }
)(Signup);