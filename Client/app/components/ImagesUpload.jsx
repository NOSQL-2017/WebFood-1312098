var React = require('react');
var {connect} = require('react-redux');
var $ = require('jquery');
var Dropzone = require('react-dropzone');

var actions = require('actions');
var  ImageUL = require('ImageUL');


var UpLoadImage = React.createClass({
   uploadFile: function(files) {
        var {dispatch, login} = this.props;
        dispatch(actions.taiAnh(files));
   },
    render: function() {
        var {dispatch, Images} = this.props;
        console.log('ds anh tai len: ', Images.dsAnh);
        var hienThiAnh = function() {
            if (Images.dsAnh.length > 0 ) {
                return Images.dsAnh.map( (anh, k) => {
                    return (
                        <ImageUL key={k} anh={anh} />
                    )
                })
            }
            return (
                <p>Chưa tải ảnh nào.</p>
            )
        }
        
        var loadMessage = function() {
            if (Images.isUpload == true) {
                return (
                   <div data-closable className="callout alert-callout-subtle primary radius">
                        <strong>Yo!</strong> Đang tải ảnh lên.....
                    </div>
                )
            } else if (Images.dsAnh.length > 0) {
                   return  (
                       <div data-closable className="callout alert-callout-subtle success">
                            <strong>Yo!</strong> Tải ảnh lên thành công
                        </div>
                   )
            }     
        }
        return (
            <div className="ImagesUpload">
                <div className="row">
                    <div className="upload">
                        <h2>Tải ảnh lên</h2>
                        <Dropzone  onDrop={this.uploadFile} className="dropzone"> 
                           <button className="button expand">Bấm bào đây để tải ảnh lên</button>
                        </Dropzone>
                    </div>

                    <div className="message">
                        {loadMessage()}
                    </div>
                    
                    <div className="row">
                        {hienThiAnh()}
                    </div>
                 </div>
            </div>
        )
    }
});

module.exports = connect(
    (state) => {
        return state;
    }
)(UpLoadImage);