var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');

var ImageLB_DT = React.createClass({
    componentWillMount: function() {
        var {dispatch, anh} = this.props;
        dispatch(actions.layDiaDanhTheoMa(anh.madiadanh));
    },
    handleDelete: function(e) {
        e.preventDefault();
        var {dispatch, anh, nguoidung, diadanh} = this.props;
        dispatch(actions.xoaAnh(anh.maanh));
    },
    render: function () {
        var { anh, dispatch, diadanh } = this.props;
        console.log(diadanh)
        return (
            <div className="marketing-site-content-section">
                <div className="marketing-site-content-section-img">
                    <img src={anh.url} alt="" />
                </div>
                <div className="marketing-site-content-section-block">
                    <h3 className="marketing-site-content-section-block-header">{diadanh.tenDiaDanh}</h3>
                    <p className="marketing-site-content-section-block-subheader subheader">{anh.camnhan}</p>
                    <p className="marketing-site-content-section-block-subheader subheader">LIKE: {anh.soluotthich}</p>
                    <a onClick={this.handleDelete} className="round button small">Xóa ảnh này</a>
                </div>    
            </div>


        )
    }
});

module.exports = connect(state => {
    return state;
})(ImageLB_DT);