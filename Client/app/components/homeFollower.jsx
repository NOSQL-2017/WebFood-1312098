var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');


var HomeFollower = React.createClass({
    handleClick: function() {
        var {dispatch, nguoidung, td} = this.props;
        dispatch(actions.huyTheoDoi(td.nguoitheodoi, nguoidung.tendangnhap));
    },
    render: function () {
        var {td} = this.props;
        var that = this;
        return (
            <div className="dsTheoDoi">
                <h5><strong>{td.nguoitheodoi}</strong></h5>
                <button className="button small radius" onClick={that.handleClick}>Hủy theo dõi</button>
            </div>
        )
    }
});

module.exports = connect(state => {
    return state;
})(HomeFollower);