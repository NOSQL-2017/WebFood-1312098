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
export var resetImageRedecer = () => {
    return {
        type: 'RESET_IMAGE_REDUCER'
    }
}

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


export var luuAnh = (url, sohuu, camnhan, diadanh) => {
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

export var layAnhNguoiTDTC = (dsAnh) => {
    return {
        type: 'LAY_DS_ANH_NGUOI_TD_TC',
        dsAnh
    }
}

export var resetAnhNguoiTD = () => {
    return {
        type: 'RESET_ANH_NGUOI_TD'
    }
}

export var layAnhNguoiTheoDoi = (dsNguoiDangTheoDoi) => {
    return (dispatch, getState) => {

        dispatch(resetAnhNguoiTD());

        dsNguoiDangTheoDoi.forEach(nguoi => {

            axios.get('http://localhost:8080/api/anh', {
                params: {
                    sohuu: nguoi.nguoitheodoi
                }
            })
                .then(function (response) {
                    if (response.data.error == false) {
                        if (response.data.dsAnhDaLuu.length > 0) {
                            dispatch(layAnhNguoiTDTC(response.data.dsAnhDaLuu));
                        }
                    } else {

                    }
                })
        })

    }
}

export var resetDsAnhTheoDoi = () => {
    return {
        type: 'RESET_ANH_THEO_DOI'
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


/// --------------followers ---------------------//
export var resetTheoDoiReducer = () => {
    return {
        type: 'RESET_THEO_DOI_REDUCER'
    }
}

export var layNguoiTheoDoiTC = (dsGoiYTheoDoi) => {
    return {
        type: 'LAY_NGUOI_THEO_DOI_TC',
        dsGoiYTheoDoi
    }
}

export var layNguoiTheoDoi = (tendangnhap) => {
    return (dispatch, getState) => {

        axios.get('http://localhost:8080/api/nguoidung', {
            params: { tendangnhap }
        })
            .then(function (res) {
                if (res.data.error == false) {
                    console.log(res.data.dsGoiYTheoDoi);
                    dispatch(layNguoiTheoDoiTC(res.data.dsGoiYTheoDoi))
                }
            })
    }
}


export var layNguoiDangTheoDoiTC = (dsNguoiDangTheoDoi) => {
    return {
        type: 'LAY_NGUOI_DANG_THEO_DOI_TC',
        dsNguoiDangTheoDoi
    }
}

export var layNguoiDangTheoDoi = (tendangnhap) => {
    return (dispatch, getState) => {
        axios.get('http://localhost:8080/api/theodoi', {
            params: {
                tendangnhap
            }
        })
            .then(function (res) {
                if (res.data.error == false) {
                    console.log(res.data);
                    dispatch(layNguoiDangTheoDoiTC(res.data.dsNguoiDangTheoDoi))
                }
            })
    }
}

export var theoDoiTc = (matheodoi) => {
    return {
        type: 'THEO_DOI_TC',
        matheodoi
    }
}

export var theoDoi = (nguoidung, nguoitheodoi) => {
    return (dispatch, getState) => {

        axios.post('http://localhost:8080/api/theodoi', {
            nguoidung,
            nguoitheodoi
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(theoDoiTc(nguoidung))
            }
        })
    }
}


export var huyTheoDoiTc = (nguoidung) => {
    return {
        type: 'HUY_THEO_DOI_TC',
        nguoidung
    }
}

export var huyTheoDoi = (nguoidung, nguoitheodoi) => {
    return (dispatch, getState) => {
        axios.delete('http://localhost:8080/api/theodoi', {
            params: {
                nguoidung,
                nguoitheodoi
            }
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(huyTheoDoiTc(nguoidung));
            }
        })
    }
}


export var demNguoiTheoDoiTC = (soLuong) => {
    return {
        type: 'DEM_NGUOI_THEO_DOI',
        soLuong
    }
}

export var demNguoiTheoDoi = (nguoitheodoi) => {
    return (dispatch, getState) => {

        axios.get('http://localhost:8080/api/theodoi/dem', {
            params: {
               nguoitheodoi
            }
        })
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(demNguoiTheoDoiTC(response.data.soLuong));
                } else {

                }
            })
    }
}

// ---- thich anh ---- //

export var thichAnhTC = () => {
    return {
        type: 'THICH_ANH_TC'
    }
}

export var thichAnh = (maanh, nguoithich) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:8080/api/thich', {
            maanh,
            nguoithich
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(thichAnhTC());
            }
        })

    }
}

export var huyThichAnhTC = () => {
    return {
        type: 'HUY_THICH_ANH'
    }
}

export var huyThichAnh = (maanh, nguoithich) => {
    return (dispatch, getState) => {
         axios.delete('http://localhost:8080/api/thich', {
           params: {
                maanh,
                nguoithich
           }
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(huyThichAnhTC());
            }
        })
    }
}

export var demSoLuongThichAnh = (maanh) => {
    return (dispatch, getState) => {
         axios.get('http://localhost:8080/api/thich/dem', {
           params: {
                maanh    
           }
        }).then(function (res) {
            if (res.data.error == false) {
                
            }
        })
    }
}