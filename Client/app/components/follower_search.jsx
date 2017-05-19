var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var follower_search = React.createClass({
    getInitialState: function () {
        return {
            btnFollower: false,
            info: {}

        }
    },
    componentDidUpdate: function(prevProps, prevState) {
        var {dispatch, nguoidung} = this.props;
        if (prevState.btnFollower != this.state.btnFollower) {
            dispatch(actions.layNguoiDangTheoDoi(nguoidung.tendangnhap));
        }
    },
    componentWillUpdate: function(nextProps, nextState) {
        var {dispatch, nguoidung} = this.props;
        if ( nextState.btnFollower != this.state.btnFollower) {
            dispatch(actions.layNguoiDangTheoDoi(nguoidung.tendangnhap));
        }
    },
    componentWillMount: function () {
        var { dispatch, nguoi , nguoidung} = this.props;
        var tendangnhap = nguoi._source.tendangnhap;
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

        axios.get('http://localhost:8081/api/theodoi/checkfollowing', {
            params: {
                username: nguoidung.tendangnhap,
                otherusername: tendangnhap
            }
        }).then( function(res) {
            if (res.data.error == false) {
               that.setState({
                   btnFollower: true
               })
            }
        })
    },
    handleClickHuyTheoDoi: function () {

        var {dispatch, nguoidung } = this.props;
        var {info} = this.state;
        console.log(nguoidung);
        var tendangnhap = nguoidung.tendangnhap;
        dispatch(actions.huyTheoDoi(tendangnhap,info.tendangnhap));
        this.setState({
            btnFollower: false
        })
    },
    handleClickTheoDoi: function () {
        var { dispatch, nguoidung } = this.props;
        var {info} = this.state;
        var tendangnhap = nguoidung.tendangnhap;
        var nguoiduoctheodoi = info.tendangnhap;

        axios.post('http://localhost:8081/api/theodoi/follow', {
            username: tendangnhap,
            otherusername: nguoiduoctheodoi
        }).then(function (res) {
            if (res.data.error == false) {
                
            } else {
                console.log("Theo doi that bai");
            }
        })
        this.setState({
            btnFollower: true
        })

    },
    render: function () {
        var { nguoi, dispatch } = this.props;
        var { btnFollower, info } = this.state;
        var img = "http://fillmurray.com/200/200";
        var that = this;
        var hienThiBtn = function () {
           if (btnFollower == false) {
                return <a href="#" className="hollow button primary" onClick={that.handleClickTheoDoi} >Theo dõi</a>
            }
            return <a href="#" className="hollow button primary" onClick={that.handleClickHuyTheoDoi} >Hủy theo dõi</a>
        }
        return (

            <div className="follower">
                <div className="blogpost-footer-author-section">
                    <div>
                        <a href="#" className="blogpost-footer-author">
                            <img className="avatar" src={info.url || img} alt="" />
                            <div>
                                <p className="author">{info.tennguoidung}</p>
                                <p className="bio">{info.gioithieu}</p>
                            </div>
                        </a>
                    </div>
                    {hienThiBtn()}

                </div>
            </div>

        )
    }
});


module.exports = connect(
    (state) => {
        return state;
    }
)(follower_search);

