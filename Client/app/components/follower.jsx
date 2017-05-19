var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var follower = React.createClass({
    getInitialState: function () {
        return {
            btnFollower: true,
            info: {}

        }
    },
    componentWillMount: function () {
        var { dispatch, nguoi } = this.props;
        var tendangnhap = nguoi.username;
        var that = this;
        axios.get('http://localhost:8085/api/nguoidung/', {
            params: {
                tendangnhap
            }
        }).then(function (res) {
            if (res.data.error == false) {
                that.setState({
                    info: res.data.nguoidung['0']
                })
            }
        })
    },
    handleClickHuyTheoDoi: function (e) {
        e.preventDefault();
        var { nguoi, dispatch, nguoidung } = this.props;
        var {info} = this.state;
        var tendangnhap = nguoidung.tendangnhap;
        dispatch(actions.huyTheoDoi(tendangnhap,info.tendangnhap));
        this.setState({
            btnFollower: false
        })
    },
    handleClickTheoDoi: function (e) {
        e.preventDefault();
        var { nguoi, dispatch, nguoidung } = this.props;
        var {info} = this.state;
        var tendangnhap = nguoidung.tendangnhap;
        dispatch(actions.theoDoi(tendangnhap, info.tendangnhap));
        this.setState({
            btnFollower: true
        })

    },
    render: function () {
        var { nguoi, dispatch } = this.props;
        var { btnFollower, info } = this.state;
        var that = this;

        var hienThiBtn = function () {
            if (btnFollower == false) {
                return <a href="#" className="hollow button primary" onClick={that.handleClickTheoDoi} >Theo dõi</a>
            }
            return <a href="#" className="hollow button primary" onClick={that.handleClickHuyTheoDoi} >Hủy theo dõi</a>
        }
        return (

            <div className="following">
                 <h5>{info.tennguoidung}</h5>
                 {hienThiBtn()}
            </div>

        )
    }
});


module.exports = connect(
    (state) => {
        return state;
    }
)(follower);

