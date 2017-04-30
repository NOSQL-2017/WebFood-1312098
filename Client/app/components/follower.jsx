var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var follower = React.createClass({
    getInitialState: function() {
        return {
            btnFollower: false
        }
    },
    handleClickHuyTheoDoi: function() {
        var {nguoi, dispatch, nguoidung} = this.props;
        dispatch(actions.huyTheoDoi( nguoi.tendangnhap,nguoidung.tendangnhap));
        this.setState({
            btnFollower: false
        })
    },
    handleClickTheoDoi: function() {
        var {nguoi, dispatch, nguoidung} = this.props;
        dispatch(actions.theoDoi(nguoi.tendangnhap, nguoidung.tendangnhap));
        this.setState({
            btnFollower: true
        })

    },
    render: function () {
        var {nguoi, dispatch} = this.props;
        var {btnFollower} = this.state;
        var that = this;
        var hienThiBtn = function() {
            if (btnFollower == false) {
                return  <button onClick={that.handleClickTheoDoi} className="button">Theo dõi</button>
            }
            return   <button onClick={that.handleClickHuyTheoDoi} className="button">Hủy theo dõi</button>
        }
        return (
            <div className="column large-4">
                    <div className="about-the-author">
                        <h3 className="author-title">Thông tin</h3>
                        <div className="row">
                            <div className="small-12 medium-4 columns">
                                <div className="author-image">
                                    <img src={nguoi.anhdaidien} />
                                </div>
                            </div>
                            <div className="small-12 medium-8 columns">
                                <h4 className="separator-left">{nguoi.tennguoidung}</h4>
                                <p>{nguoi.email}</p>
                                {hienThiBtn()}
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
)(follower);

