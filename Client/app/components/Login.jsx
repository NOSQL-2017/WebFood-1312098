var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var router = require('react-router');

import { browserHistory } from 'react-router';
var Login = React.createClass({
    componentWillMount: function () {
        var { nguoidung , giaodien, dispatch} = this.props;
        if (giaodien === false) {
            dispatch(actions.doiGiaoDien())
        }
        if (nguoidung.dangnhap == 1) {
            browserHistory.push('/');
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.nguoidung.dangnhap == 1) {
            browserHistory.push('/');
        }
    },
    componentWillUnmount: function() {
        var {dispatch} = this.props;
        dispatch(actions.doiGiaoDien())
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var { dispatch } = this.props;
        dispatch(actions.dangNhap(this.refs.tendangnhap.value, this.refs.matkhau.value));
    },
    render: function () {
        var { nguoidung } = this.props;

        var hienThiThongBao = () => {
            if (nguoidung.kiemtra == true) {
                return (
                    <div data-closable className="callout alert-callout-subtle primary radius">
                        <strong>Yo!</strong> Kiểm tra tài khoản ....
                    <button className="close-button" aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">⊗</span>
                        </button>
                    </div>
                )

            } else if (nguoidung.dangnhap == 2) {
                return (
                    <div data-closable class="callout alert-callout-subtle alert">
                        <strong>Yo!</strong> Tên đăng nhập hoặc mật khẩu sai
                        <button className="close-button" aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">⊗</span>
                        </button>
                    </div>
                )
            }
        }
        return (
            <section className="section-login" >
                <div className="row">
                    <div className="column message">
                        {hienThiThongBao()}
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <form className="log-in-form" onSubmit={this.handleSubmit}>
                            <h4 className="text-center">Đăng nhập</h4>
                            <label>Tên đăng nhập
                                <input type="text" ref="tendangnhap" placeholder="vidu" />
                            </label>
                            <label>Mật khẩu
                                <input type="password" ref="matkhau" placeholder="Password" />
                            </label>
                            <p><input type="submit" className="button expanded" value="Đăng nhập" /></p>
                        </form>
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
)(Login);