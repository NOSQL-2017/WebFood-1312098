import React from 'react';
import { connect } from 'react-redux';
import { layDsAnhSoHuu2 } from '../../actions/images';
import Img from './image';

let ListImages = React.createClass({
    getInitialState: function () {
        return {
            dsAnh: []
        }
    },
    componentWillMount: function () {
        let { dispatch, sohuu } = this.props;
        dispatch(layDsAnhSoHuu2(sohuu))
            .then(
            res => {
                this.setState({ dsAnh: res.data.dsAnh })
            }
            )
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