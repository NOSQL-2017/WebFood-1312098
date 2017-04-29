var React = require('react');
var actions = require('actions');
var { connect } = require('react-redux');

var imageDT = React.createClass({
    componentWillMount: function() {
        var {dispatch} = this.props;
        dispatch(actions.layDsDiaDanh());
    },
   handleLuuAnh: function() {
       var {anh, dispatch, nguoidung} = this.props;
       var camnhan = this.refs.camnhan.value;
       var diadanh = this.refs.madiadanh.value;
       this.refs.camnhan.value = '';

       dispatch(actions.luuAnh(anh.secure_url,nguoidung.tendangnhap,camnhan,diadanh));
   },
    render: function () {
        var { anh, dispatch , diadanh} = this.props;
        
        var hienThiDiaDanh = function() {
            if (diadanh.dsDiaDanh.length > 0) {
                return diadanh.dsDiaDanh.map( (dd, k) => {
                    return (
                         <option key={k} value={dd.madiadanh}>{dd.tendiadanh}</option>
                    )
                })
            }
        }
        return (
            <div className="marketing-site-content-section">
                <div className="marketing-site-content-section-img">
                    <img src={anh.secure_url} alt="" />
                </div>
                <div className="marketing-site-content-section-block">
                    <textarea type="text" ref="camnhan" placeholder="Cảm nghĩ"/>
                    <select ref="madiadanh">
                            {hienThiDiaDanh()}
                    </select>
                    <a onClick={this.handleLuuAnh} className="round button small">Lưu lại</a>
                </div>   
            </div>

        )
    }
})

module.exports = connect(state => {
    return state;
})(imageDT);