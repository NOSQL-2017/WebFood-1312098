var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var HomeImages = require('homeImages');

var home = React.createClass({
    getInitialState: function() {
        return {
            dsTheoDoi: []
        }
    },
    componentWillMount: function() {
        var {theodoi, dispatch , nguoidung} = this.props;
        dispatch(actions.layNguoiDangTheoDoi(nguoidung.tendangnhap));
    },
    componentWillUpdate: function(nextProps, nextState) {
        var {dispatch} = this.props;
        if (nextProps.theodoi.dsDangTheoDoi.length != this.props.theodoi.dsDangTheoDoi.length) {
            dispatch(actions.layAnhNguoiTheoDoi(nextProps.theodoi.dsDangTheoDoi));
        }
    }, 
    handleClick: function() {
        var {dispatch, nguoidung} = this.props;
        console.log(this.refs.nguoitheodoi.value);
        dispatch(actions.huyTheoDoi(this.refs.nguoitheodoi.value, nguoidung.tendangnhap));
    },
    render: function () {
        var {nguoidung, dispatch, theodoi, Images} = this.props;
        var {dsTheoDoi} = this.state;
        var that = this;
        var luotTheoDoi = 19999;
        var hienThiDanhSachNguoiDangTheoDoi = () => {
            if (theodoi.dsDangTheoDoi.length > 0) {
                return theodoi.dsDangTheoDoi.map ( (td, k) => {
                    return (
                        <div key={k} className="dsTheoDoi">
                            <h5><strong>{td.nguoitheodoi}</strong></h5>
                            <button value={td.nguoitheodoi} ref="nguoitheodoi" className="button small radius" onClick={that.handleClick}>Hủy theo dõi</button>
                        </div>
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