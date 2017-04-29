var React = require('react');
var actions = require('actions');
var {connect} = require('react-redux');
var ImageLB_DT = require('ImageLB_DT');
import { browserHistory } from 'react-router';

var ImageLB = React.createClass({
    componentWillMount: function() {
        var {dispatch, nguoidung} = this.props;
        if (nguoidung.isLogin == false) {
            browserHistory.push('/login');
        }
        dispatch(actions.layAnh(nguoidung.tendangnhap));
    },
    render: function() {
        var {dispatch, nguoidung, Images} = this.props;
        console.log('ds anh da luu: ',Images.dsAnhDaLuu);
        var hienThiAnh = () => {
            if (Images.dsAnhDaLuu.length > 0) {
                return Images.dsAnhDaLuu.map ( (anh, k) => {
                    return (
                        <ImageLB_DT key={k} anh={anh} />
                    )
                })
            }
            return <p>Bạn chưa đăng ảnh nào.</p>
        }

        return (
            <div>
                {hienThiAnh()}
            </div>
        )
    }
})


module.exports = connect(
    state => {
        return state;
    }
)(ImageLB);