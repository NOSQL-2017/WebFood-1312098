var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var ImageLB_DT = React.createClass({
    getInitialState: function() {
        return {
            soLuongLike: 0,
            tenDiaDanh: ''
        }
    },
    componentWillMount: function() {
        var {dispatch, anh} = this.props;
         axios.get('http://localhost:8082/api/diadanh/layDiaDanhTheoMa', {
                params: {
                    madiadanh: anh.madiadanh
                }
            }).then(function (response) {
                if (response.data.error == false) {
                    this.setState({
                        tenDiaDanh: response.data.tendiadanh
                    })
                }
        }.bind(this))
         axios.get('http://localhost:8081/api/thichanh/countlike', {
            params: {
                images_id: anh.maanh
            }
        }).then(function (res) {
            if (res.data.error == false) {
                this.setState({
                    soLuongLike: res.data.soluotthich || 0
                })
            }
        }.bind(this))
    },
    handleDelete: function(e) {
        e.preventDefault();
        var {dispatch, anh, nguoidung, diadanh} = this.props;
        dispatch(actions.xoaAnh(anh.maanh));
    },
    render: function () {
        var { anh, dispatch, diadanh } = this.props;
        var {soLuongLike, tenDiaDanh} = this.state;
        return (
            <div className="marketing-site-content-section">
                <div className="marketing-site-content-section-img">
                    <img src={anh.url} alt="" />
                </div>
                <div className="marketing-site-content-section-block">
                    <h3 className="marketing-site-content-section-block-header">{tenDiaDanh}</h3>
                    <p className="marketing-site-content-section-block-subheader subheader">{anh.camnhan}</p>
                    <p className="marketing-site-content-section-block-subheader subheader">LIKE: {soLuongLike}</p>
                    <a onClick={this.handleDelete} className="round button small">Xóa ảnh này</a>
                </div>    
            </div>


        )
    }
});

module.exports = connect(state => {
    return state;
})(ImageLB_DT);