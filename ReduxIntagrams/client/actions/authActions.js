import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER, TIM_KIEM_NGUOI_DUNG, SET_CURRENT_IMAGES } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setCurrentImages(images) {
  return {
    type: SET_CURRENT_IMAGES,
    images
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch(setCurrentImages({}));
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
    return axios.get(`/api/users/${tendangnhap}`);
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

export function kiemTraTheoDoi(tennguoitheodoi, tennguoiduoctheodoi) {
  return dispatch => {
    return axios.get('http://localhost:8081/api/theodoi/checkfollowing', {
      params: {
        username: tennguoitheodoi,
        otherusername: tennguoiduoctheodoi
      }
    })
  }
}

export function timKiemThanhCong(data) {
  return {
    type: 'TIM_KIEM_NGUOI_DUNG',
    data
  }
}

export function timKiem(hoten) {
  return dispatch => {
    return axios.get('http://localhost:8083/api/search', {
      params: {
        hoten: hoten
      }
    })
  }
}

