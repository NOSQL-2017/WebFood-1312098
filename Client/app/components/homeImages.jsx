var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var HomeImages = React.createClass({
    getInitialState: function () {
        return {
            like: false,
            soLuongLike: 0
        }
    },
    componentWillUpdate: function(nextProps, nextState) {
        var {dispatch, anh} = this.props;
        if (nextState.like != this.state.like) {
            axios.get('http://localhost:8080/api/thich/dem', {
            params: {
                maanh: anh.maanh
            }
            }).then(function (res) {
                if (res.data.error == false) {
                    this.setState({
                        soLuongLike: res.data.soluotthich
                    })
                }
            }.bind(this))
        }
    },
    componentWillMount: function () {
        var {anh, nguoidung} = this.props;
        axios.get('http://localhost:8080/api/thich/dem', {
            params: {
                maanh: anh.maanh
            }
        }).then(function (res) {
            if (res.data.error == false) {
                this.setState({
                    soLuongLike: res.data.soluotthich
                })
            }
        }.bind(this))

         axios.get('http://localhost:8080/api/thich/kiemtra', {
            params: {
                maanh: anh.maanh,
                nguoithich: nguoidung.tendangnhap
            }
            }).then(function (res) {
                if (res.data.error == false) {
                    this.setState({
                        like: res.data.isLike
                    })
                }
            }.bind(this))
    },
    handleLike: function () {
        var { dispatch, anh, nguoidung } = this.props;
        dispatch(actions.thichAnh(anh.maanh, nguoidung.tendangnhap));
        this.setState({
            like: true
        })
    },
    handleUnLike: function () {
        var { dispatch, anh, nguoidung } = this.props;
        dispatch(actions.huyThichAnh(anh.maanh, nguoidung.tendangnhap));
        this.setState({
            like: false
        })
    },

    render: function () {
        var { anh, dispatch } = this.props;
        var { like, soLuongLike } = this.state;

       
        var that = this;
        var hienThiNutLike = function () {
            if (like == false) {
                return <button onClick={that.handleLike} className="button-hover-like button"><span>Thích</span><i className="ion-android-favorite"></i></button>
            } else {
                return <button onClick={that.handleUnLike} className="button-hover-like button"><span>Hủy thích</span><i className="ion-android-favorite"></i></button>
            }
        }
        return (
            <div className="row homeImages">
                <div className="card-flex-article card">
                    <div className="card-image">
                        <img src={anh.url} />
                        <span className="label alert card-tag">#{anh.madiadanh}</span>
                    </div>
                    <div className="card-section">
                        <h3 className="article-title">{anh.sohuu}</h3>
                        <p className="article-summary">{anh.camnhan}</p>
                    </div>
                    <div className="chucnang">
                        <div className="notability">
                            <span className="publications">Lượt thích</span>
                            <span className="likes"># {soLuongLike}</span>
                        </div>
                        <div className="card-actions">
                            {hienThiNutLike()}
                        </div>
                    </div>
                </div>


            </div>
        )
    }
})

module.exports = connect(state => {
    return state;
})(HomeImages);