import React from 'react';
import {connect} from 'react-redux';
import {layDsAnhSoHuu} from '../../actions/images';

let ListImages = React.createClass({
    getInitialState: function() {
        return {
            dsAnh: []
        }
    },
    componentWillMount: function() {
        let {dispatch, sohuu} = this.props;
        dispatch(layDsAnhSoHuu(sohuu))
    },
    render: function() {
        return (
            <div></div>
        )
    }
});

module.exports = connect(state=> {
    return state;
})(ListImages);