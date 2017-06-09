import React from 'react';
import Dropzone from 'react-dropzone';
import { uploadImages } from '../../actions/images';
import { connect } from 'react-redux';
import Images from './ListImagesUpload';

let ImagesUpload = React.createClass({
  getInitialState: function () {
    return {
      files: []
    }
  },
  onDrop: function (files) {
    const { dispatch } = this.props;
    dispatch(uploadImages(files));
  },
  onSubmit: function () {
    const { dispatch } = this.props;
    let files = this.state.files;
    dispatch(uploadImages(files));
  },
  render: function () {
    let { images } = this.props;
    console.log('call')
    let showListImagesUpload = images.listImagesUpload.map((e) => {
      return <Images key={e.id} image={e.image} id={e.id} />
    })
    return (
      <section >
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Dropzone onDrop={this.onDrop}>
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
            <div className="col-sm-8">
              {showListImagesUpload}
            </div>
          </div>
        </div>


        {/*<button className="btn btn-primary" onClick={this.onSubmit}>Upload</button>*/}
      </section>
    );
  }
})

module.exports = connect(state => { return state })(ImagesUpload);