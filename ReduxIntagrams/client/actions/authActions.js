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

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export function layThongTinNguoiDung(tendangnhap) {
  return dispatch => {
    return axios.get('http://localhost:8085/api/nguoidung/', {
      params: {
        tendangnhap
      }
    })
  }
}

export function theoDoi(nguoitheodoi, nguoiduoctheodoi) {
  return dispatch => {
    return axios.post('http://localhost:8081/api/theodoi/follow', {
      username: nguoitheodoi,
      otherusername: nguoiduoctheodoi
    })
  }
}

export function huyTheoDoi(nguoitheodoi, nguoiduoctheodoi) {
  return dispatch => {
    return axios.delete('http://localhost:8081/api/theodoi/unfollow', {
      params: {
        username: nguoitheodoi,
        otherusername: nguoiduoctheodoi
      }
    })
  }
}

export function demSoNguoiDangTheoiDoi(tendangnhap) {
  return dispatch => {
    return axios.get('http://localhost:8081/api/theodoi/countFollowing', {
      params: {
        username: tendangnhap
      }
    })
  }
}

export function demSoNguoiTheoDoi(tendangnhap) {
  return dispatch => {
    return axios.get('http://localhost:8081/api/theodoi/countFollowers', {
      params: {
        otherusername: tendangnhap
      }
    })
  }
}

export function layNguoiDangTheoiDoi(tendangnhap) {
  return dispatch => {
    return axios.get('http://localhost:8081/api/theodoi/getfollowing', {
      params: {
        username: tendangnhap
      }
    })
  }
}

export function timKiem(keyword) {
  return dispatch => {
    return axios.get('http://localhost:8083/api/search', {
      params: {
        tennguoidung: tennguoidung
      }
    })
  }
}

