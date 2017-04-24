var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');


var myImages = React.createClass({
    getInitialState: function() {
        return {
            images: []
        }
    },
    componentWillMount: function() {
        var {dispatch, login} = this.props;
        dispatch(actions.startGetImages());
    },

    componentDidMount: function() {
        var {dispatch, login} = this.props;
        axios.post('http://localhost:8080/api/images/get', {
            username: login.username
        }).then(function(res) {
            if (res.data.error == false) {
                console.log('Thanh Cong');
                this.setState({ images: res.data.images});
                dispatch(actions.completedGetImages(res.data.images));
            } else {
                dispatch(actions.failedGetImages());
            }
        }.bind(this))
    },

    render: function() {
        var {images} = this.state;
        var {dispatch, handleImages} = this.props;
        console.log(images);
        var list = images.map( (image, k) => {
                    console.log(image);
                    return (
                        <li key={k}>
                            <figure className="images">
                                <img src={image.url} alt=""/>
                            </figure>
                        </li>
                    )})
        return (        
            <section className="section-my-images">
                <div className="row">
                    <h2> Ảnh của bạn</h2>
                </div>
                <ul className="my-images">
                    {list}
                </ul>
               
            </section>
        )
    }
});

module.exports = connect(
    (state) => {
        return state;
    }
)(myImages);