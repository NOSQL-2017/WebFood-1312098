var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var HomeImages = require('homeImages');

var ThongTinCaNhan = require('home_thongtincanhan');
var home = React.createClass({
    getInitialState: function() {
        return {
            dsTheoDoi: []
        }
    },
    componentWillMount: function() {
        var {theodoi, dispatch , nguoidung} = this.props;
        dispatch(actions.layThongTinNguoiDung(nguoidung.tendangnhap));
        dispatch(actions.demNguoiTheoDoi(nguoidung.tendangnhap))
    },
    render: function () {
        var {nguoidung, dispatch, theodoi, Images} = this.props;
        var {dsTheoDoi} = this.state;
        var that = this;

        var luotTheoDoi = theodoi.soNguoiTheoDoi;

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
                            <div className="thongtincanhan">
                                <ThongTinCaNhan />
                            </div>                            
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