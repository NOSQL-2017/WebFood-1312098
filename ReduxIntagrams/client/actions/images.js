import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { UPLOAD_IMAGES_SUCCESS, REMOVE_IMAGE, LAY_DS_ANH_SH, XOA_ANH_SH } from './types';
var sha1 = require('sha1');
var superagent = require('superagent')
import 'whatwg-fetch'

export function uploadSuccess(image) {
    return {
        type: UPLOAD_IMAGES_SUCCESS,
        image
    }
}

export function uploadImages(files) {
    return dispatch => {
        var image = files;
        var cloudName = 'doancuoiki';
        var url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';

        var timestamp = Date.now() / 1000;
        var uploadPreset = 'pvdung';

        var paramsStr = 'timestamp=' + timestamp + '&upload_preset=' +
            uploadPreset + 'e68qaWrrPTkhExBJsAW4ngQrQvw';
        var signature = sha1(paramsStr);

        var params = {
            'api_key': '894259973189773',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }


        files.forEach(image => {
            var uploadRequest = superagent.post(url);
            uploadRequest.attach('file', image);

            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            });

            uploadRequest.end((err, resp) => {
                if (err) {
                    alert(err, null);
                    return;
                }

                var uploaded = resp.body;
                console.log(uploaded)
                dispatch(uploadSuccess(uploaded));

            })
        })
    }
}

export function saveSuccess() {
    return {
        type: SAVE_IMAGES_SUCCESS
    }
}

export function saveImage(data, username) {
    return dispatch => {

        let image = {
            url: data.url,
            status: data.status,
            city: data.city
        }

        function luuSoHuuAnh() {
            return axios.post('http://localhost:8082/api/sohuuanh/', {
                sohuu: username,
                maanh: data.id
            })
        }

        function luuAnhVaoDiaDanh() {
            return axios.post('http://localhost:8082/api/diadanh/luuAnhVaoDiaDanh', {
                maanh: data.id,
                url: data.url,
                madiadanh: data.city,
                sohuu: username
            })
        }

        function luuAnh() {
            return axios.post('http://localhost:8084/api/anh', {
                maanh: data.id,
                thongtinanh: image
            })
        }

        function taoNodeChoAnh() {
            return axios.post('http://localhost:8081/api/thichanh/createimage', {
                images_id: data.id
            })
        }

        return axios.all([luuSoHuuAnh(), luuAnhVaoDiaDanh(), luuAnh(), taoNodeChoAnh()]);

    }
}

export function removeImage(id) {
    return {
        type: REMOVE_IMAGE,
        id
    }
}

export function layDsAnhSoHuuTC(dsAnh) {
    return {
        type: LAY_DS_ANH_SH,
        dsAnh
    }
}

export function layDsAnhSoHuu(sohuu) {
    return dispatch => {
        axios.get('http://localhost:8082/api/sohuuanh', {
            params: {
                sohuu
            }
        }).then(function (res) {
             dispatch(layDsAnhSoHuuTC(res.data.dsAnh));   
        }).catch(function(err) {
            console.log('Lay danh sách thất bại')
        })
    }
}

export function xoaAnhSoHuuThanhCong(maanh) {
    return {
        type: XOA_ANH_SH,
        maanh
    }
}

export function xoaAnhSoHuu(maanh,sohuu,madiadanh) {
    return dispatch => {

        function xoaAnhMongo1() {
            return axios.delete('http://localhost:8082/api/sohuuanh', {
                params: {
                    maanh,
                    sohuu
                }
            })
        }

        function xoaAnhMongo2() {
            return axios.delete('http://localhost:8082/api/diadanh/', {
                params: {
                    maanh,
                    madiadanh
                }
            })
        }

        function xoaAnhRedis() {
            return axios.delete('http://localhost:8084/api/anh', {
                params: {
                    maanh
                }
            })
        }

        function xoaAnhNeo() {
            return axios.delete('http://localhost:8081/api/thichanh/deleteimage', {
                params: {
                    images_id: maanh
                }
            })
        }

        axios.all([xoaAnhMongo1(), xoaAnhMongo2(), xoaAnhNeo(), xoaAnhRedis()])
            .then((results) => {
                dispatch(xoaAnhSoHuuThanhCong(maanh))
            }, (error) => {
                console.log('Xoa that bai')
            });
    }
}

export function layThongTinAnh(maanh) {
    return dispatch => {
        return axios.get('http://localhost:8084/api/anh/', {
            params: {
                maanh
            }
        })
    }
}

export function demSoLuongThich(maanh) {
    return dispatch => {
        return axios.get('http://localhost:8081/api/thichanh/countlike', {
            params: {
                images_id: maanh
            }
        })
    }
}

export function kiemTraThichAnh(nguoidung, maanh) {
    return dispatch => {
        return axios.get('http://localhost:8081/api/thichanh/checklike', {
            username: nguoidung,
            images_id: maanh
        })
    }
}

export function thichAnh(maanh, nguoithich) {
    return dispatch => {
        return axios.post('http://localhost:8081/api/thichanh/like', {
            images_id: maanh,
            username: nguoithich
        })
    }
}

export function huyThichAnh(maanh, nguoithich) {
    return dispatch => {
        return axios.delete('http://localhost:8081/api/thichanh/unlike', {
            params: {
                images_id: maanh,
                username: nguoithich
            }
        })
    }
}

export function taiAnhDaiDien(files) {
    return dispatch => {
        
    }
}

export function luuAnhDaiDien(url, username) {
    return dispatch => {
        
    }
}
