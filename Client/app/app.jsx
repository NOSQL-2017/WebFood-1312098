var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, browserHistory, useRouterHistory} = require('react-router');
var {Provider} = require('react-redux');

//Components
var Main = require('Main');
var Content = require('content');
var store = require('configureStore').configure();
var Login = require('Login');
var Signup = require('Signup');
var uploadImage = require('uploadImage');
var myImages = require('myimages');
var followers = require('follower');

// Load foundation
// add all features of foundation
require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Content} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/uploadimage" component={uploadImage}></Route>
                <Route path="/myimages" component={myImages} />
                <Route path="/followers" component={followers} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("app")
)