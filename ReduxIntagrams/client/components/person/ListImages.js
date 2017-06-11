import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { layThongTinAnh, demSoLuongThich, kiemTraThichAnh, thichAnh, huyThichAnh } from '../../actions/images';


let ListImages = React.createClass({
    getInitialState: function () {
        return {
            thongtin: {},
            numLike: 0,
            isLike: false
        }
    },
    componentWillMount: function () {
        let { dispatch, maanh, auth } = this.props;
        dispatch(layThongTinAnh(maanh))
            .then(
            res => {
                this.setState({ thongtin: res.data.info })
            }
            )
        dispatch(demSoLuongThich(maanh))
            .then(
            res => {
                this.setState({ numLike: res.data.total })
            }
            )
        dispatch(kiemTraThichAnh(auth.user.username, maanh))
            .then(
            res => {
                this.setState({ isLike: res.data.like })
            }
            )
    },
    Like: function (e) {
        e.preventDefault();
        let { dispatch, auth, maanh } = this.props;
        let {numLike} = this.state;
        dispatch(thichAnh(maanh, auth.user.username))
            .then(
            res => {
                this.setState({ isLike: true, numLike: numLike + 1 })
            }
            )
    },
    UnLike: function (e) {
        e.preventDefault();
        let { dispatch, auth, maanh } = this.props;
        let {numLike} = this.state;
        dispatch(huyThichAnh(maanh, auth.user.username))
            .then(
            res => {
                this.setState({ isLike: false, numLike: numLike - 1 })
            }
            )
    },
    render: function () {
        let { thongtin, numLike, isLike } = this.state;
        let that = this;
        function buttonLike() {
            return (
                <a className="btn btn-info btn-sm" role="button" onClick={that.Like}>Like</a>
            )
        }
        function buttonUnLike() {
            return (
                <a className="btn btn-info btn-sm" role="button" onClick={that.UnLike}>UnLike</a>
            )
        }

        return (
            <div>
                <div >
                    <div className="panel panel-default panel-front">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#"><img src={thongtin.url} /></a></h4>
                        </div>
                        <div className="panel-body">
                            <h4>#{thongtin.city}</h4>
                            {thongtin.status}
                            <div className="text-left">
                                <a className="btn btn-info btn-sm" role="button">{numLike}</a>
                            </div>
                            <div className="text-right">
                                {isLike ? buttonUnLike() : buttonLike()}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
})

module.exports = connect(state => {
    return state;
})(ListImages);