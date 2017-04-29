var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var home = React.createClass({
    componentWillMount: function () {
    },
    componentDidMount: function () {
        // var { dispatch, login } = this.props;
        // var { followers, images } = this.state;
        // axios.get('http://localhost:8080/api/followers', {
        //     params: {
        //         tenDangNhap: login.username
        //     }
        // }).then(function (res) {
        //     if (res.data.error == false) {
        //         var temp = res.data.followers;
        //         this.setState({
        //             followers: res.data.followers
        //         });
        //         for (var i = 0; i < temp.length; i++) {
        //             console.log(temp[i].follower);
        //             axios.get('http://localhost:8080/api/images', {
        //                 params: {
        //                     tenDangNhap: temp[i].follower
        //                 }
        //             }).then(function (res) {
        //                 var updateImages = Object.assign([], this.state.images, res.data.images);
        //                 this.setState({
        //                     images: updateImages
        //                 })
        //             }.bind(this));
        //         }
        //     }
        // }.bind(this))


    },
    handleUnFollower: function () {

    },
    render: function () {
        /*var { login } = this.props;
        var { images, followers } = this.state;
        console.log(images);
        console.log(followers);
        var listImages = images.map((image, k) => {
            return (
                <ul key={k}>
                    <li >
                        <div className="infor-images">
                            <h5>{image.username}</h5>
                        </div>
                        <img src={image.url} alt="" />
                        <div className="like">
                            Like : DisLike
                            </div>
                    </li>
                </ul>
            )
        })*/
        /*var listFollowers = followers.map((follower, k) => {
            return (
                <ul key={k}>
                    <li className="name-follower">
                        <p>{follower.follower}</p>
                    </li>
                    <li>
                        <button className="btn-Unfollower"> Unfollow</button>
                    </li>
                </ul>
            )
        })*/
        return (
            <section className="section-home">
                <div className="" row>
                    <div className="images col span_4_of_7 box">
                        {/*{images.length === 0 ? <h3>Theo dõi nhiều người để có nhiều ảnh hơn</h3> : listImages}*/}
                    </div>
                    <div className="information span_2_of_7 box">
                        <div className="person-infor">
                            <h4>Thông tin cá nhân</h4>
                            <div>
                                <p></p>
                                <p>Email: dungvatoi12@gmail.com</p>
                                <p>So luot theo doi: 10000</p>
                            </div>

                        </div>
                        <div className="person-follower">
                            <h4>Đã theo dõi:</h4>
                            {/*{listFollowers}*/}
                        </div>
                    </div>
                </div>
            </section>)
    }
});

module.exports = connect(
    (state) => {
        return state;
    }
)(home);