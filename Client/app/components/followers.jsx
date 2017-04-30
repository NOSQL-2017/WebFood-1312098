var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var Follower = require('follower');

var Followers = React.createClass({
     componentWillMount: function() {
        var {dispatch, nguoidung} = this.props;
        dispatch(actions.layNguoiTheoDoi(nguoidung.tendangnhap))
    },
    render: function() {
        var {theodoi, nguoidung, dispatch} = this.props;

        var hienThiGoiY = function() {
            if (theodoi.dsGoiY.length > 0) {
                return theodoi.dsGoiY.map( (nguoi, k) => {
                    return <Follower key={k} nguoi={nguoi} />
                })
            }
            return <h2>chưa có nguoi dùng nào cả.</h2>
        }
        return (
            <div  className="followers">
                <div className="row">
                    {hienThiGoiY()}
                </div>
            </div>
        )
    }
});

module.exports = connect(state => {
    return state;
})(Followers);