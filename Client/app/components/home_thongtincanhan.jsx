var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var Dropzone = require('react-dropzone');

var ThongTinCaNhan = React.createClass({
    componentWillMount: function() {
        var {dispatch, nguoidung} = this.props;
        dispatch(actions.countFollowers(nguoidung.tendangnhap));
        dispatch(actions.countFollowing(nguoidung.tendangnhap));
    },
    uploadFile: function(files) {
        var {dispatch, nguoidung} = this.props;
        dispatch(actions.taiAnhCaNhan(files,nguoidung.tendangnhap));
        dispatch(actions.layThongTinNguoiDung(nguoidung.tendangnhap));
    },
    render: function () {
        var {dispatch, nguoidung} = this.props;
        var img = "http://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg";
        var nothing = "nothing to show";
        console.log(nguoidung);
        return (
            <div className="card-profile-stats">
                <div className="card-profile-stats-intro">
                    <Dropzone  onDrop={this.uploadFile} className="dropzone"> 
                        <img className="card-profile-stats-intro-pic" src={nguoidung.thongtin.url || img} alt="profile-image" />
                     </Dropzone>
                    <div className="card-profile-stats-intro-content">
                        <h3 className="text-center">{nguoidung.thongtin.tennguoidung}</h3>
                        <p className="text-center"><small>{nguoidung.thongtin.email}</small></p>
                    </div>
                </div>

                <hr />

                <div className="card-profile-stats-container">
                    {/*<div className="card-profile-stats-statistic">
                        <span className="stat">25</span>
                        <p>posts</p>
                    </div>*/}
                    <div className="card-profile-stats-statistic">
                        <span className="stat">{nguoidung.totalFollowers}</span>
                        <p>followers</p>
                    </div>
                    <div className="card-profile-stats-statistic">
                        <span className="stat">{nguoidung.totalFollowing}</span>
                        <p>following</p>
                    </div>
                </div>

                <div className="card-profile-stats-more" >
                        <p>
                            {nguoidung.thongtin.gioithieu || nothing}
                        </p>
                </div >
            </div >


        )
    }
});

module.exports = connect( state => {
    return state;
})(ThongTinCaNhan);