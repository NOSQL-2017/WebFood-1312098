var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var FollowerSearch = require('follower_search');
var Follower = require('follower');

var Followers = React.createClass({
    getInitialState: function() {
        return {
            isSearch: false
        }
    },
    componentWillMount: function() {
        var {dispatch, nguoidung} = this.props;
        dispatch(actions.layNguoiDangTheoDoi(nguoidung.tendangnhap))
    },
    handleSearch: function() {
        var {dispatch, nguoidung} = this.props;
        var tennguoidung = this.refs.tennguoidung.value;
        this.refs.tennguoidung.value = '';
        dispatch(actions.search(tennguoidung, nguoidung.tendangnhap));
        this.setState({
            isSearch: true
        })
    },
    render: function() {
        var {theodoi, nguoidung, dispatch, timkiem} = this.props;
        var {isSearch} = this.state;
        var that = this;
        var hienThiGoiY = function() {
            if (theodoi.dsGoiY.length > 0) {
                return theodoi.dsGoiY.map( (nguoi, k) => {
                    return <Follower key={k} nguoi={nguoi} />
                })
            }
            return <h2>bạn chưa theo dõi ai cả.</h2>
        }
        var hienThiTimKiem = function() {
            if (timkiem.dsTimKiem.length > 0) {
                return timkiem.dsTimKiem.map( (nguoi, k) => {
                    return <FollowerSearch key={k} nguoi={nguoi} />
                })
            }
        }
        var hienThiDsTheoDoi = function() {
            console.log(theodoi);
            if (theodoi.dsDangTheoDoi.length > 0) {
                return theodoi.dsDangTheoDoi.map ( (nguoi, k) => {
                    return (
                        <Follower key={k} nguoi={nguoi} />
                    )
                })
            }
            return <h4>Bạn chưa theo dõi ai cả</h4>
        }

        var hienThi = function() {
            if (isSearch == false) {
                return hienThiGoiY();
            }
            return hienThiTimKiem();
        }
        return (
            <div className="row">
                <div className="column large-8">
                    <div className="followers">
                        <div className="row">
                            <ul className="search menu">
                                <li><input type="search" placeholder="Nhập tên người dùng" ref="tennguoidung"/></li>
                                <li><button type="button" className="button" onClick={that.handleSearch}>Tìm kiếm</button></li>
                            </ul>
                        </div>

                        <div className="row">
                            {hienThi()}
                        </div>
                    </div>
                </div>
                <div className="column large-4">
                    <div className="dstheodoi">
                        <h3>Đang theo dõi</h3>
                        <div className="scoll-follower">
                            {hienThiDsTheoDoi()}
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
});

module.exports = connect(state => {
    return state;
})(Followers);