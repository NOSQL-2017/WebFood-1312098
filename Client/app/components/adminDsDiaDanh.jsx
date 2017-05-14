var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var AdminDsDiaDanh = React.createClass({
    xoaDiaDanh: function(e) {
        e.preventDefault();
        var {dd, dispatch} = this.props;
        dispatch(actions.xoaDiaDanh(dd.madiadanh));
    },
    render: function() {
        var {dd, dispatch} = this.props;
        return (
            <div className="dsdiadanh">
                <h5>{dd.tendiadanh}</h5>
                <button className="button" onClick={this.xoaDiaDanh}>Xóa</button>
            </div>
        )
    }
})

module.exports = connect(state => {
    return state;
})(AdminDsDiaDanh);