import React from 'react';
import { connect } from 'react-redux';
import { layThongTinAnh, demSoLuongThich, thichAnh, huyThichAnh, kiemTraThichAnh } from '../../actions/images';
import { Link } from 'react-router';

let img = React.createClass({
    getInitialState: function () {
        return {
            thongtin: {},
            isLike: false,
            numLike: 0
        }
    },
    componentWillUnmount: function () {
        this.setState({
            thongtin: {},
            isLike: false,
            numLike: 0 
        })
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
                this.setState({ numLike: res.data.total });
            }
            )
        dispatch(kiemTraThichAnh(auth.user.username,maanh))
            .then(
                res => (
                    this.setState({isLike: res.data.like})
                )
            )
    },
    Like: function () {
        let { dispatch, auth, maanh } = this.props;
        let {numLike} = this.state;
        dispatch(thichAnh(maanh, auth.user.username))
            .then(
            res => {
                this.setState({ isLike: true, numLike: numLike + 1 })
            }
            )
    },
    UnLike: function () {
        let { dispatch, auth, maanh, sohuu } = this.props;
        let {numLike} = this.state;
        dispatch(huyThichAnh(maanh, auth.user.username))
            .then(
            res => {
                this.setState({ isLike: false, numLike: numLike - 1 })
            }
            )
    },
    render: function () {
        let { isLike, thongtin, numLike } = this.state;
        let {sohuu} = this.props;
        let that = this;
        console.log(thongtin);
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
            <div className="col-sm-4">
                <div className="panel panel-default panel-front">
                    
                    <div className="panel-heading">
                        <h4 className="panel-title"><a><img src={thongtin.url} /></a></h4>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/users/${sohuu}`} activeClassName="active">{sohuu}</Link></h4>
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
        )
    }
});

module.exports = connect(state => {
    return state;
})(img);