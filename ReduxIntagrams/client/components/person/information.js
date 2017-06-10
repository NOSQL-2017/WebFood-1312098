import React from 'react';
import {kiemTraTheoDoi, layThongTinNguoiDung, theoDoi, huyTheoDoi, demSoNguoiDangTheoiDoi, demSoNguoiTheoDoi } from '../../actions/authActions';
import { connect } from 'react-redux';


let Information = React.createClass({
    getInitialState: function () {
        return {
            thongtin: {},
            numFollow: '',
            numFollowing: '',
            isFollow: false
        }
    },
    componentWillMount: function () {
        
        let { dispatch,  auth , username} = this.props;

        dispatch(layThongTinNguoiDung(username))
            .then(
            res => {
                this.setState({ thongtin: res.data.user })
            },
            error => {
                console.log('Lấy thông tin thất bại');
            }
            )
        dispatch(demSoNguoiDangTheoiDoi(username))
            .then(
            res => {
                this.setState({ numFollowing: res.data.total })
            }
            )
        dispatch(demSoNguoiTheoDoi(username))
            .then(
            res => {
                this.setState({ numFollow: res.data.total })
            }
            )
        dispatch(kiemTraTheoDoi(auth.user.username, username))
            .then(
                res => {
                    this.setState({isFollow: res.data.follow})
                }
            )
        
    },
    Follow: function () {
        let { dispatch, auth, username} = this.props;
        dispatch(theoDoi(auth.user.username, username))
            .then(
            res => { this.setState({ isFollow: true }) },
            error => { }
            )
    },
    UnFollow: function () {
        let { dispatch, auth , username} = this.props;
        dispatch(huyTheoDoi(auth.user.username, username))
            .then(
            res => { this.setState({ isFollow: false }) },
            error => { }
            )
    },
    render: function () {
        let { thongtin, isFollow } = this.state;
        let that = this;
        function buttonFollow() {
            return (
                <div className="follow" onClick={that.Follow}> <div className="icon-twitter" />Follow</div>
            )
        }

        function buttonUnfollow() {
            return (
                <div className="follow" onClick={that.UnFollow}> <div className="icon-twitter" />UnFollow</div>
            )
        }
        return (
            <div className="information">
                <div className="container ">
                    <header>
                        <div className="bio">
                            <img src="http://www.croop.cl/UI/twitter/images/up.jpg" alt="background" className="bg" />
                            <div className="desc">
                                <h3>@{thongtin.name}</h3>
                                <p>{thongtin.email}</p>
                            </div>
                        </div>
                        <div className="avatarcontainer">
                            <img src="http://www.croop.cl/UI/twitter/images/carl.jpg" alt="avatar" className="avatar" />
                            <div className="hover">
                                <div className="icon-twitter" />
                            </div>
                        </div>
                    </header>
                    <div className="content">
                        <div className="data">
                            <ul>
                                <li>
                                    2,934
                <span>Upload</span>
                                </li>
                                <li>
                                    {this.state.numFollow}
                                    <span>Followers</span>
                                </li>
                                <li>
                                    {this.state.numFollowing}
                                    <span>Following</span>
                                </li>
                            </ul>
                        </div>
                        {isFollow ? buttonUnfollow() : buttonFollow()}
                    </div>
                </div>

            </div>

        );
    }
});


module.exports = connect(state => {
    return state;
})(Information);