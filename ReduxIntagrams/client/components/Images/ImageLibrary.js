import React from 'react';
import { layThongTinAnh, demSoLuongThich, xoaAnhSoHuu } from '../../actions/images';
import {connect} from 'react-redux';
let ImageLibrary = React.createClass({
    getInitialState: function () {
        return {
            thongtinanh: {},
            like: '',
            error: {},
            isDelete: false
        }
    },
    componentWillMount: function () {
        let { dispatch, img } = this.props;
        let that = this;
        dispatch(layThongTinAnh(img.maanh)).then(
            res => { that.setState({ thongtinanh: res.data.info }) },
            error => { that.setState({ error }) }
        )
        dispatch(demSoLuongThich(img.maanh)).then(
            res => { that.setState({ like: res.data.total || 0 }) },
            error => { that.setState({ error }) }
        )
    },
    deleteImage: function(e) {
        e.preventDefault();
        let {dispatch, img, auth} = this.props;
        let {thongtinanh} = this.state;
        this.setState({isDelete: true})
        dispatch(xoaAnhSoHuu(img.maanh,auth.user.username, thongtinanh.city ));
    },
    render: function () {
        var { thongtinanh, like } = this.state;
        return (
            <div className="col-sm-4">
                <div className="panel panel-default panel-front">
                    <div className="panel-heading">
                        <h4 className="panel-title"><a><img src={thongtinanh.url} /></a></h4>
                    </div>
                    <div className="panel-body">
                        <h4>#{thongtinanh.city}</h4>
                        {thongtinanh.status}
                        <div className="text-left">
                            <a className="btn btn-info btn-sm" role="button">{like}</a>
                        </div>
                        <div className="text-right">
                            <a disabled={this.state.isDelete} className="btn btn-info btn-sm" role="button" onClick={this.deleteImage}>Xóa hình</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = connect(state => {
    return state;
})(ImageLibrary);