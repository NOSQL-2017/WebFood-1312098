var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var {Router} = require('react-router');

import { browserHistory } from 'react-router';
var Signup = React.createClass({
    componentWillMount: function() {
        var {dispatch, button, login} = this.props;
        dispatch(actions.resetLogin());
        if (button === 0) {
            dispatch(actions.pressSignup());
        }
    },
    componentWillUnmount: function() {
        var {dispatch} = this.props;
        dispatch(actions.resetButton());
        dispatch(actions.resetLogin());
    },
    componentWillReceiveProps: function(newProps) {

    },
    handleSubmit: function(e) {
        var {dispatch} = this.props;
        e.preventDefault();
        var {dispatch} = this.props;
        var tenDangNhap = this.refs.tenDangNhap.value,
            hoTen = this.refs.hoTen.value,
            email = this.refs.email.value,
            matKhau = this.refs.matKhau.value;
        axios.post('http://localhost:8080/api/users', {
            tenDangNhap: tenDangNhap,
            hoTen: hoTen,
            email: email,
            matKhau: matKhau
        })
        .then(function (response) {
            if (response.data.error == false) {
                dispatch(actions.loginSuccess(tenDangNhap));
                browserHistory.push('/');
            } else {
                dispatch(actions.loginFailed());
            }
        })
    },
    render: function() {
        var {login} = this.props;
        var loadMessage = function() {
            if (login.isFetching === true) {
                return <h4>Đang kiểm tra.....</h4>
            } else if (login.isLogin === 2){
                return <h4 className="Warring">Tên đăng nhập đã tồn tại!!</h4>
            }
        }
        return (
            <section className="section-signup">
                <div className="row">
                    <h2>ĐĂNG KÝ</h2>
                </div>
                <div className="message-login">
                    {loadMessage()}
                </div>
                <div className="row">
                <form onSubmit={this.handleSubmit} className="signup-form">
                        <div className="row">
                            <div className="col span_1_of_3">
                                <label htmlFor="name">Tên đăng nhập</label>
                            </div>
                            <div className="col span_2_of_3">
                                <input type="text" name="name" id="name" ref="tenDangNhap" placeholder="Tên đăng nhập" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col span_1_of_3">
                                <label htmlFor="name">Họ tên</label>
                            </div>
                            <div className="col span_2_of_3">
                                <input type="text" name="name" id="name" ref="hoTen" placeholder="Tên của bạn" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col span_1_of_3">
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="col span_2_of_3">
                                <input type="email" name="email" id="email" ref="email" placeholder="Email của bạn" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col span_1_of_3">
                                <label htmlFor="password">Mật khẩu</label>
                            </div>
                            <div className="col span_2_of_3">
                                <input type="password" ref="matKhau" name="passowrd" id="password" placeholder="Mật khẩu đăng nhập" required />
                            </div>
                        </div>
                        <div className="row row-btn">
                            <button className="btn">Đăng kí</button>
                        </div>
                    </form>
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