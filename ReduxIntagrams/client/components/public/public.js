import React from 'react';
import { connect } from 'react-redux';
import Images from './images';
import { layDsNguoiDung } from '../../actions/images'

let Public = React.createClass({
  getInitialState: function () {
    return {
      dsNguoiDung: []
    }
  },
  componentWillMount: function () {
    let { dispatch, auth } = this.props;
    dispatch(layDsNguoiDung())
      .then(
      res => {
        let dsNguoiDung = [];
        if (res.data.data.length > 0) {
          dsNguoiDung = res.data.data.filter(e => {
            return e.sohuu != auth.user.username
          })
        }
        this.setState({ dsNguoiDung: dsNguoiDung })
      },
      err => {
        this.setState({ dsNguoiDung: [] })
      }
      )
  },
  componentWillUnmount: function () {
    this.setState({ dsNguoiDung: [] })
  },
  render: function () {
    let { auth } = this.props;
    let { dsNguoiDung } = this.state;
    console.log(this.state.dsNguoiDung)
    let listImages;
    if (dsNguoiDung.length > 0) {
      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }
      let rand = shuffleArray(dsNguoiDung)
      listImages = rand.map((e, k) => {
        return <Images sohuu={e.sohuu} key={k} dsAnh={e.dsAnh} />
      })
    }

    return (
      <div>
        {listImages}
      </div>
    )
  }

})

module.exports = connect(state => {
  return state;
})(Public)