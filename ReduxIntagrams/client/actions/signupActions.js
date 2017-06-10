import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function userSignupRequest(userData) {
  return dispatch => {
    function signup() {
      return axios.post('/api/users', userData);
    }

    function taoNode() {
      return axios.post('http://localhost:8081/api/theodoi/createuser', {
        username: userData.username
      })
    }

    function taoSearch() {
      return axios.post('http://localhost:8083/api/search', {
        tendangnhap: userData.username,
        hoten: userData.name
      })
    }

    return axios.all([signup(), taoNode(), taoSearch()])
      .then(axios.spread(function (res1, res2, res3) {
        const token = res1.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
      }))
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}
