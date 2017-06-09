import React from 'react';
import {connect} from 'react-redux';
import { layDsAnhSoHuu } from '../../actions/images';
import ImageLibrary from './ImageLibarary';
import map from 'lodash/map';

var Library = React.createClass({
  componentWillMount: function() {
    let {dispatch, auth} = this.props;
    dispatch(layDsAnhSoHuu(auth.user.username));
  },
  render: function() {
    let {images} = this.props;
    let listImages = map(images.listImages, (val, k) => {
        return <ImageLibrary img={val} key={k} />
    })
    return (

      <div className="container">
        <div className="row">
            {listImages}
         </div>   
      </div>
    );
  }
});

module.exports = connect(state => {
  return state;
})(Library);