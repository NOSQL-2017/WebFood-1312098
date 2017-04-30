var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var HomeImages = require('homeImages');
var HomeFollower = require('homeFollower');

var home = React.createClass({
    getInitialState: function() {
        return {
            dsTheoDoi: []
        }
    },
    componentWillMount: function() {
        var {theodoi, dispatch , nguoidung} = this.props;
        dispatch(actions.layNguoiDangTheoDoi(nguoidung.tendangnhap));
        dispatch(actions.demNguoiTheoDoi(nguoidung.tendangnhap))
    },
    componentWillUpdate: function(nextProps, nextState) {
        var {dispatch} = this.props;
        if (nextProps.theodoi.dsDangTheoDoi.length != this.props.theodoi.dsDangTheoDoi.length) {
            console.log('call');
            dispatch(actions.layAnhNguoiTheoDoi(nextProps.theodoi.dsDangTheoDoi));
        }
    },
    render: function () {
        var {nguoidung, dispatch, theodoi, Images} = this.props;
        var {dsTheoDoi} = this.state;
        var that = this;

        var luotTheoDoi = theodoi.soNguoiTheoDoi;
        var hienThiDanhSachNguoiDangTheoDoi = () => {
            if (theodoi.dsDangTheoDoi.length > 0) {
                return theodoi.dsDangTheoDoi.map ( (td, k) => {
                    return (
                        <HomeFollower key={k} td={td} />
                    )
                })
            }
            return <h4>Bạn chưa theo dõi ai cả</h4>
        }

        var hienThiAnh = () => {
            if (Images.dsAnhNguoiTheoDoi.length > 0) {
                return Images.dsAnhNguoiTheoDoi.map ( (anh, k) => {
                    return <HomeImages anh={anh} key={k} />
                })
            }
            return <h2>Chưa có ảnh nào cả.</h2>
        }
        return (
            <div className="home">
                <div className="row">
                    <div className="column large-8 details">
                        {hienThiAnh()}   
                    </div>

                    <div className="column large-3 information">
                        <div className="row">
                            <h3>Thông tin cá nhân</h3>
                            <p>{nguoidung.tendangnhap}</p>
                            <p>{nguoidung.email}</p>
                            <p><strong>Lượt theo dõi:</strong> {luotTheoDoi}</p>
                        </div>
                        <div className="row td">
                            <h3>Danh sách theo dõi</h3>
                            {hienThiDanhSachNguoiDangTheoDoi()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = connect(
    (state) => {
        return state;
    }
)(home);