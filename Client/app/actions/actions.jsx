var axios = require('axios');

var sha1 = require('sha1');
var superagent = require('superagent')


// ----- nguoi dung ----------------///
export var doiGiaoDien = () => {
    return {
        type: 'DOI_GIAO_DIEN'
    }
}

export var dangXuat = () => {
    return {
        type: 'DANG_XUAT'
    }
}
export var kiemTraDangNhap = () => {
    return {
        type: 'KIEM_TRA_DANG_NHAP'
    }
}

export var dangNhapThanhCong = (tendangnhap) => {
    return {
        type: 'DANG_NHAP_THANH_CONG',
        tendangnhap
    }
}


export var dangNhapThatBai = () => {
    return {
        type: 'DANG_NHAP_THAT_BAI'
    }
}


export var dangNhap = (username, password) => {
    var tendangnhap = username;
    var matkhau = password
    return (dispatch, getState) => {
        dispatch(kiemTraDangNhap());
        axios.post('http://localhost:8080/api/nguoidung/login', {
            tendangnhap,
            matkhau
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(dangNhapThanhCong(tendangnhap));
            } else {
                dispatch(dangNhapThatBai());
            }
        })
    }
}


export var kiemTraDangKy = () => {
    return {
        type: 'KIEM_TRA_DANG_KY'
    }
}

export var dangKyThanhCong = (tendangnhap) => {
    return {
        type: 'DANG_KY_THANH_CONG',
        tendangnhap
    }
}

export var dangKyThatBai = () => {
    return {
        type: 'DANG_KY_THAT_BAI'
    }
}

export var dangKy = (tendangnhap, hoten, email, matkhau) => {
    return (dispatch, getState) => {
        dispatch(kiemTraDangKy());

        axios.post('http://localhost:8080/api/nguoidung/signup', {
            tendangnhap,
            hoten,
            email,
            matkhau
        })
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(dangKyThanhCong(tendangnhap));
                } else {
                    dispatch(dangKyThatBai());
                }
            })

    }
}


// upload images

export var batDauTaiAnh = () => {
    return {
        type: 'BAT_DAU_TAI_ANH'
    }
}

export var taiAnhThanhCong = (anh) => {
    return {
        type: 'TAI_ANH_THANH_CONG',
        anh
    }
}

export var taiAnh = (files) => {
    return (dispatch, getState) => {
        dispatch(batDauTaiAnh());
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
                dispatch(taiAnhThanhCong(uploaded));

            })
        })
    }

}

export var batDauLuuAnh = () => {
    return {
        type: 'BD_LUU_ANH'
    }
}

export var luuAnhThanhCong = (url) => {
    return {
        type: 'LUU_ANH_TC',
        url
    }
}


export var luuAnh = (url, sohuu, camnhan, diadanh ) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:8080/api/anh', {
           url,
           sohuu,
           camnhan,
           diadanh
        })
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(luuAnhThanhCong(url));
                } else {
                    
                }
            })
    }
}

export var batDauLayAnh = () => {
    return {
        type: 'BD_LAY_ANH'
    }
}

export var layAnhThanhCong = (dsAnhDaLuu) => {
    return {
        type: 'LAY_ANH_TC',
        dsAnhDaLuu
    }
}

export var layAnh = (sohuu) => {
    return (dispatch, getState) => {
        axios.get('http://localhost:8080/api/anh', {
          params: {
              sohuu
          }
        })
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(layAnhThanhCong(response.data.dsAnhDaLuu));
                } else {
                    
                }
            })
    }
}


export var batDauXoaAnh = () => {
    return {
        type: 'BD_XOA_ANH'
    }
}

export var xoaAnhThanhCong = (maanh) => {
    return {
        type: 'XOA_ANH_TC',
        maanh
    }
}

export var xoaAnh = (maanh) => {
    return (dispatch, getState) => {
        axios.delete('http://localhost:8080/api/anh', {
          params: {
              maanh
          }
        })
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(xoaAnhThanhCong(maanh));
                }
            })
    }
}




// Get link images form pg

export var startGetImages = () => {
    return {
        type: 'START_GET_IMAGES'
    }
}

export var completedGetImages = (images) => {
    return {
        type: 'COMPLETED_GET_IMAGES',
        images
    }
}

export var failedGetImages = () => {
    return {
        type: 'FAILED_GET_IMAGES'
    }
}

// get User 
export var getListUsers = () => {
    return {
        type: 'GET_LIST_USERS'
    }
}

// followers
export var Follower = (username, follower) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:8080/api/followers', {
            tenDangNhap: username,
            follower: follower
        }).then(function (res) {
            if (res.data.error == false) {
                console.log("Thanh Cong");
            }
        })
    }
}

export var UnFollower = (username, follower) => {
    return (dispatch, getState) => {
        axios.delete('http://localhost:8080/api/followers', {
            params: {
                tenDangNhap: username,
                follower: follower
            }
        }).then(function (res) {
            if (res.data.error == false) {
                console.log("Thanh Cong");
            }
        })
    }
}

//--- dia danh --- //

export var layDsDiaDanhTc = (dsDiaDanh) => {
    return {
        type: 'LAY_DS_DIA_DANH',
        dsDiaDanh
    }
}

export var layDsDiaDanh = () => {
    return (dispatch, getState) => {
         axios.get('http://localhost:8080/api/diadanh')
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(layDsDiaDanhTc(response.data.dsDiaDanh));
                } else {
                    
                }
            })
    }
}


export var layDiaDanhTheoMaTC = (tenDiaDanh) => {
    return {
        type: 'LAY_DIA_DANH_THEO_MA',
        tenDiaDanh
    }
}

export var layDiaDanhTheoMa = (madiadanh) => {
     return (dispatch, getState) => {
         axios.get('http://localhost:8080/api/diadanh/id', {
             params: {
                 madiadanh
             }
         })
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(layDiaDanhTheoMaTC(response.data.tendiadanh['0'].tendiadanh));
                } else {
                    
                }
            })
    }
}
