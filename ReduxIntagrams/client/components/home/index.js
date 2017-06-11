import React from 'react';
import { connect } from 'react-redux';
import Images from './images';
import Greetings from './Greetings';
import { layNguoiDangTheoiDoi } from '../../actions/authActions'

let Home = React.createClass({
    getInitialState: function () {
        return {
            dsTheoDoi: []
        }
    },
    componentWillMount: function () {
        let { dispatch, auth } = this.props;
        dispatch(layNguoiDangTheoiDoi(auth.user.username))
            .then(
            res => {
                this.setState({ dsTheoDoi: res.data.dsTheoDoi })
            },
            err => {
                console.log(err);
            }
            )
    },
    render: function () {
        let { auth } = this.props;
        console.log(this.state.dsTheoDoi)
        let listImages = this.state.dsTheoDoi.map((e, k) => {
            return <Images sohuu={e.username} key={k} />
        })
        return (
            <div>
                {auth.isAuthenticated == false ? <Greetings /> : listImages}         
            </div>
        )
    }

})

module.exports = connect(state => {
    return state;
})(Home)