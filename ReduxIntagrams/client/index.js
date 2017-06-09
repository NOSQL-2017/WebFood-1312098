import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';

import routes from './routes';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}
require('style!css!bootstrap/dist/css/bootstrap.css')
require('style!css!./styles/css/Greeting.css');
require('style!css!./styles/css/Public.css');
require('style!css!./styles/css/ImagesUpload.css');
require('style!css!./styles/css/ListImagesUpload.css');
require('style!css!./styles/css/Library.css');
require('style!css!./styles/css/PersonInformation.css');
require('style!css!./styles/css/Search.css');
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, 
  document.getElementById('app'));
  
require('!script!jquery/dist/jquery.min.js')
require('!script!bootstrap/dist/js/bootstrap.min.js')
require('!script!./styles/js/Greeting.js');

