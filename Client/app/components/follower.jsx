var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var follower = React.createClass({
    getInitialState: function() {
        return {
            friends: [],
            followers: [],
            tempFollower: []
        }
    },
    componentDidMount: function() {
        var {dispatch, login} = this.props;
         axios.get('http://localhost:8080/api/followers', {
             params: {
                tenDangNhap: login.username
            }
        }).then(function(res) {
            if (res.data.error == false) {
                this.setState({
                    followers: res.data.followers});
            } 
        }.bind(this))

        axios.get('http://localhost:8080/api/users', {
            params: {
                tenDangNhap: login.username
            }
        }).then(function(res) {
                if (res.data.error === false) {
                    var users = res.data.users;
                    this.setState({friends: users})
                }
            }.bind(this))

       
        
    },
    handleClickFollow: function(follower) {
        var {dispatch, login} = this.props;
        var updateTemp = Object.assign([], this.state.tempFollower);
        updateTemp.push(follower);

        dispatch(actions.Follower(login.username, follower));
        this.setState({
            tempFollower: updateTemp
        })
        
    },
    handleClickUnFollow: function(follower) {
        var {dispatch, login} = this.props;
        var updateTemp = Object.assign([], this.state.tempFollower);
        var index = updateTemp.indexOf(follower);
        dispatch(actions.UnFollower(login.username, follower));
        updateTemp.splice(index,1);
        this.setState({
            tempFollower: updateTemp
        })
    },
    render: function() {
        var {friends, followers, tempFollower} = this.state;
        var temp = Object.assign([], followers);
        friends = friends.filter(function(e) {
            var kq = 0;
            for (var i = 0; i < temp.length; i++) {
                if(temp[i].follower === e.username) {
                    kq = 1;
                    break;
                }
            }
            return kq === 0;
        })
        
        var list = friends.map((friend, k) => {
            var temp = Object.assign([],tempFollower);
            return (
                <ul  key={k}>
                    <li><label htmlFor="name">Họ tên:   </label><p name="name">{friend.tennguoidung}</p> 
                    {    
                            temp.indexOf(friend.username) == -1 ?
                                        <button className="btn-follower" onClick={() => {this.handleClickFollow(friend.username)}}>followers</button>
                                       : <button className="btn-follower" onClick={() => {this.handleClickUnFollow(friend.username)}}>Unfollowers</button>

                    }
                    </li>
                    <li> <label htmlFor="email">Email:  </label><p name="email">{friend.email} </p></li>
                    <li>Số người theo dõi: 100000</li>
                </ul>
             
            )
        })
        return (
            <section className="row section-followers">
                <h2>Tìm bạn bè</h2>
                <div className="row">
                    <div className="col span_2_of_3 box">
                         {list}
                    </div>
                </div>
            </section>
        )
    }
});


module.exports = connect(
    (state) => {
        return state;
    }
)(follower);

