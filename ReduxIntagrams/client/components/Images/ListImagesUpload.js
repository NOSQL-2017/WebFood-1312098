import React from 'react';
import { connect } from 'react-redux';
import { saveImage, removeImage } from '../../actions/images';
import Cities from '../../data/city';
import map from 'lodash/map';

let ListImagesUpload = React.createClass({
    getInitialState: function () {
        return {
            id: '',
            url: '',
            status: '',
            city: '',
            isSaving: false,
            errors: {},
            isSuccess: false
        }
    },
    onSubmit: function (e) {
        e.preventDefault();
        let { image, dispatch } = this.props;
        this.setState({
            isSaving: true
        })
        let { user } = this.props.auth;
        let that = this;
        dispatch(saveImage(this.state, user.username))
            .then(
            (res) => {
                that.setState({ isSuccess: true, isSaving: false });
                dispatch(removeImage(that.state.id))
            },
            (errors) => {
                that.setState({ errors: errors, isSaving: false });
            }
            )
    },
    onChange: function (e) {
        let { image, id } = this.props;
        this.setState({
            id: id,
            url: image.secure_url
        })
        this.setState({ [e.target.name]: e.target.value })
    },
    render: function () {
        let { image } = this.props;
        let { isSaving, isSuccess } = this.state;

        function saveImageSuccess() {
            return (
                <h3>Lưu ảnh thành công</h3>
            )
        }
        const options = map(Cities, (val, key) =>
            <option key={val.id} value={val.id}>{val.name}</option>
        );
        return (
            <div className="container">
                {isSuccess ? saveImageSuccess() : ""}
                <div className="row">
                    <div className="col-md-8">
                        <div className="well well-sm">
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-md-6">

                                        <img src={image.secure_url} className="img-rounded" alt="" width="304" height="236" />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Status</label>
                                            <textarea onChange={this.onChange} value={this.state.status} name="status" className="form-control" rows={5} cols={15} required placeholder="Suy nghĩ của bạn" />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">Thành Phố</label>
                                            <select
                                                className="form-control"
                                                name="city"
                                                onChange={this.onChange}
                                                value={this.state.city}
                                                required
                                            >
                                                <option value="" disabled>Chọn thành phố</option>
                                                {options}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <button disabled={isSaving} className="btn btn-primary pull-right" id="btnContactUs">
                                            Lưu Ảnh</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
})

module.exports = connect(state => state)(ListImagesUpload);