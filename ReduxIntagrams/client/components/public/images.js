import React from 'react';
import { connect } from 'react-redux';
import Img from './image';

let ListImages = React.createClass({
    getInitialState: function () {
        return {
            dsAnh: []
        }
    },
    componentWillMount: function () {
        let { dispatch, sohuu, dsAnh } = this.props;
        this.setState({ dsAnh: dsAnh })
    },
    componentWillUnmount: function() {
        this.setState({dsAnh: []})
    },
    render: function () {
        let {dsAnh} = this.state;
        let {sohuu} = this.props;
        let listImages = []
        console.log(dsAnh);
        if (dsAnh != null) {
            listImages = dsAnh.map( (e, k) => {
                return <Img maanh={e.maanh} key={k} sohuu={sohuu} />
            })
        }
        return (
            <div className="container">
                <div className="row">
                    {listImages }
                </div>
            </div>
        )
    }
});

module.exports = connect(state => {
    return state;
})(ListImages);