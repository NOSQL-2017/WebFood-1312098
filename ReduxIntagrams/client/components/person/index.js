import React from 'react';
import Information from './information';
import ListImages from './ListImages';
import { connect } from 'react-redux';
import { layDsAnhSoHuu } from '../../actions/images';

let Person = React.createClass({
    componentWillMount: function () {
        let username = this.props.params.username;
        let { dispatch } = this.props;
        dispatch(layDsAnhSoHuu(username));
    },
    render: function () {
        let username = this.props.params.username;
        let { images } = this.props;
        let img = [];
        if (images.listImages != null) {
            img = images.listImages.map((e, k) => {
                return <ListImages key={k} maanh={e.maanh} />
            })
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <Information username = {username} />
                    </div>
                    <div className="col-sm-8">
                        {img}
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = connect(state => {
    return state;
})(Person);
