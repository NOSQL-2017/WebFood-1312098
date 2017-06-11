import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout, timKiem, timKiemThanhCong } from '../actions/authActions';
import { browserHistory } from 'react-router';

let NavigationBar = React.createClass({
  getInitialState: function () {
    return {
      username: ''
    }
  },
  logout: function (e) {
    e.preventDefault();
    let { dispatch } = this.props;
    dispatch(logout());
  },
  onSubmit: function (e) {
    e.preventDefault();
    let { dispatch } = this.props;
    dispatch(timKiem(this.state.username))
      .then(
      res => {
        console.log(res);
        dispatch(timKiemThanhCong(res.data.dsTimKiem));
        browserHistory.push('/search');
      },
      err => {
        console.log('Lỗi tìm kiếm.')
      }
      )
  },
  onChange: function (e) {
    this.setState({ [e.target.name]: e.target.value });
  },
  render: function () {
    const { isAuthenticated, user } = this.props.auth;
    const form = (
      <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="text" onChange={this.onChange} name="username" value={this.state.username} className="form-control" placeholder="Nhập tên người dùng" required />
        </div>
        <button type="submit" className="btn btn-default">Tìm</button>
      </form>
    )
    const userLogin = (
      <ul className="nav navbar-nav">
        <li className="active"><Link to="#">Trang chủ<span className="sr-only">(current)</span></Link></li>
        <li><Link to="images">Đăng ảnh</Link></li>
        <li><Link to="library">Thư viện</Link></li>
        <li><Link to="public">Cộng đồng</Link></li>
      </ul>
    )
    const userNotLogin = (
      <ul className="nav navbar-nav">
        <li className="active"><Link to="#">Trang chủ<span className="sr-only">(current)</span></Link></li>
      </ul>
    )
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/" onClick={this.logout}>Đăng xuất</Link></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Đăng ký</Link></li>
        <li><Link to="/login">Đăng nhập</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="#">ReactIntagrams</Link>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {isAuthenticated ? userLogin : userNotLogin}
            {isAuthenticated ? form : <div></div>}
            <div className="nav navbar-nav navbar-right">
              <div className="collapse navbar-collapse">
                {isAuthenticated ? userLinks : guestLinks}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
})


module.exports = connect(state => {
  return state;
})(NavigationBar);
