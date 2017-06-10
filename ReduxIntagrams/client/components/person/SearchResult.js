import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { kiemTraTheoDoi, layThongTinNguoiDung, theoDoi, huyTheoDoi } from '../../actions/authActions';

let SearchResult = React.createClass({
    getInitialState: function () {
        return {
            thongtin: {},
            isFollow: false,
            clickFollow: false
        }
    },
    componentWillMount: function () {
        let { dispatch, nguoidung, auth } = this.props;
        dispatch(layThongTinNguoiDung(nguoidung._source.tendangnhap))
            .then(
            res => { this.setState({ thongtin: res.data.user }) },
            error => { console.log('Lấy thông tin người dùng thất bại') }
            )
        dispatch(kiemTraTheoDoi(auth.user.username, nguoidung._source.tendangnhap))
            .then(
            res => {
                this.setState({ isFollow: res.data.follow })
            }
            )

    },
    onClickFollow: function (e) {
        e.preventDefault();
        let { dispatch, auth, nguoidung } = this.props;
        dispatch(theoDoi(auth.user.username, nguoidung._source.tendangnhap))
            .then(
            res => { this.setState({ isFollow: true }) },
            error => { }
            )
    },
    onClickUnFollow: function (e) {
        e.preventDefault();
        let { dispatch, auth, nguoidung } = this.props;
        dispatch(huyTheoDoi(auth.user.username, nguoidung._source.tendangnhap))
            .then(
            res => { this.setState({ isFollow: false }) },
            error => { }
            )
    },
    onClick: function (e) {
        e.preventDefault();

    },
    render: function () {
        let { thongtin, isFollow } = this.state;
        let that = this;
        function buttonFollow() {
            return (
                <button type="button" className="btn btn-primary" onClick={that.onClickFollow}>Follow</button>
            )
        }
        function buttonUnFollow() {
            return (
                <button type="button" className="btn btn-primary" onClick={that.onClickUnFollow}>UnFollow</button>
            )
        }
        return (
            <div className="col-xs-12 col-sm-6 col-md-6">
                <div className="well well-sm">
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            <img src="http://placehold.it/380x500" alt className="img-rounded img-responsive" />
                        </div>
                        <div className="col-sm-6 col-md-8">
                            <h4>
                                <Link to={`/users/${thongtin.username}`} activeClassName="active">{thongtin.name}</Link>
                            </h4>
                            <p>
                                <i className="glyphicon glyphicon-envelope" />{thongtin.email}
                                <br />
                                <i className="glyphicon glyphicon-gift" />June 02, 1988
                            </p>
                            <div className="btn-group">
                                {isFollow ? buttonUnFollow() : buttonFollow()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = connect(state => { return state })(SearchResult);