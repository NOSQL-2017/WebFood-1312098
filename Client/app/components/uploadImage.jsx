var React = require('react');
var {connect} = require('react-redux');
var $ = require('jquery');
var axios = require('axios');
var Dropzone = require('react-dropzone');
var sha1 = require('sha1');
var superagent = require('superagent')
var actions = require('actions');


var UpLoadImage = React.createClass({
    getInitialState: function() {
        return {
            images: [],
            saveSuccess: 0
        }
    }, 
    componentWillReceiveProps: function(nextProps) {
        
    },
   uploadFile: function(files) {
        var {dispatch, login} = this.props;
        //console.log('uploadFile: ');
        var image = files;
        //console.log(image);
        var cloudName = 'doancuoiki';
        var url = 'https://api.cloudinary.com/v1_1/'+ cloudName + '/image/upload';

        var timestamp = Date.now()/1000;
        var uploadPreset = 'pvdung';

        var paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + 
                        uploadPreset + 'e68qaWrrPTkhExBJsAW4ngQrQvw';
        var signature = sha1(paramsStr);

        var params = {
            'api_key': '894259973189773',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        
        files.forEach(image => {
            var uploadRequest = superagent.post(url);
            uploadRequest.attach('file', image);
            
            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            });

            uploadRequest.end( (err, resp) => {
                if (err) {
                    alert(err, null);
                    return;
                }
                //console.log('UPLOAD COMPLETE: ', JSON.stringify(resp.body));
                var uploaded = resp.body;
                
                var updatedImages = Object.assign([], this.state.images)
                updatedImages.push(uploaded);
                this.setState({
                    images: updatedImages
                })
            })
        })
        
        dispatch(actions.completedUpload());
        
   },
   removeImage: function(e) {
        e.preventDefault();

        var updatedImages = Object.assign([], this.state.images)
            updatedImages.splice(e.target.id, 1);
            this.setState({
                images: updatedImages
            })

   },
    handleSave: function() {
        if (this.state.images.length === 0) {
            return;
        }
        var {dispatch, login} = this.props;
        //console.log(this.state.images);
        dispatch(actions.saveImageToPg(login.username, this.state.images));
        dispatch(actions.resetStateUpload());
        this.setState({images: []});
    },
    render: function() {
        var {dispatch, uploadImage} = this.props;
        var list = this.state.images.map((image, k) => {
            return (
                <li key={k}>
                    <firgure className="image">
                        <img  src={image.secure_url} alt=""/>
                    </firgure>
                    <br/>
                    <a href="#" onClick={this.removeImage}>Xóa</a>
                </li>
            )
        })
        var loadMessage = function() {
            if (uploadImage.isUpload == 1) {
                return (
                    <h4>Đang tải ảnh lên.........</h4>
                )
            } else if (uploadImage.isUpload == 2) {
                   return  (
                        <div>
                            <h4>Đã tải ảnh lên thành công</h4>
                        </div>
                   )
            }     
        }
        return (
            <div className="row">
                <div className="uploadimages">
                    <h2>Upload Images</h2>
                    <Dropzone  onDrop={this.uploadFile} className="dropzone"> 
                        <div>Bấm vào để tải ảnh lên</div>
                    </Dropzone>
                </div>
                <div className="message">
                    <button className="btn-save" onClick={this.handleSave}>Lưu lại</button>
                     {loadMessage()}
                </div>
                
                <section className="section-upload-images">
                    <ul className="my-images-upload">
                        { list }
                    </ul>
                </section>
                
            </div>
        )
    }
});

module.exports = connect(
    (state) => {
        return state;
    }
)(UpLoadImage);