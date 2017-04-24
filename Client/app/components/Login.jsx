var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var router = require('react-router');

import { browserHistory } from 'react-router';
var Login = React.createClass({

    componentWillMount: function() {
        var {dispatch, button} = this.props;
        dispatch(actions.resetLogin());
        if (button === 0) {
            dispatch(actions.pressLogin());
        }
    },
    componentWillUnmount: function() {
        var {dispatch} = this.props;
        dispatch(actions.resetButton());
    },
    handleSubmit: function(e) {
        var {dispatch} = this.props;
        e.preventDefault();
        var tenDangNhap = this.refs.tenDangNhap.value;
        var matKhau = this.refs.matKhau.value;
        dispatch(actions.fetchLogin(tenDangNhap, matKhau));   
    },
    render: function () {
        var {login} = this.props;
        var loadMessage = function() {
            if (login.isFetching === true) {
                return <h4>Đang kiểm tra.....</h4>
            } else {
                if (login.isLogin === 1) {
                    browserHistory.push('/');
                } else if (login.isLogin === 2) {
                     return <h4 className="Warring">Tên đang nhập hoặc mật khẩu không đúng!!</h4>
                }
            }
        }
        return (
            <section className="section-login">
                <div className="row">
                    <h2>Đăng Nhập</h2>
                </div>
                <div className="message-login">
                    {loadMessage()}
                </div>
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="login-form">
                        <div className="row">
                            <div className="col span_1_of_3">
                                <label htmlFor="name">Tên đăng nhập</label>
                            </div>
                            <div className="col span_2_of_3">
                                <input type="text" ref="tenDangNhap" name="name" id="name" placeholder="Tên của bạn" required />
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
                            <button className="btn">Đăng nhập</button>
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
)(Login);