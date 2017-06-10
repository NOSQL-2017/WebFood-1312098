import React from 'react';
import {connect} from 'react-redux';
import {layThongTinAnh} from '../../actions/images';

let img = React.createClass({
    getInitialState: function() {
        return {
            thongtin: {},
            isLike: false
        }
    },
    componentWillMount: function() {
        let {dispatch, maanh} = this.props;
        dispatch(layThongTinAnh(maanh))
            .then(
                res => {
                    this.setState({thongtin: res.data.info})
                }
            )
    },
    render: function() {
        return (
            <div></div>
        )
    }
});

module.exports = connect(state=> {
    return state;
})(img);