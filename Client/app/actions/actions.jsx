var axios = require('axios');
var uuid = require('node-uuid');
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
        axios.post('http://localhost:8085/api/nguoidung/login', {
            tendangnhap,
            matkhau
        }).then(function (res) {
            if (res.data.check == true) {
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

        axios.post('http://localhost:8085/api/nguoidung/signup', {
            tendangnhap,
            hoten,
            email,
            matkhau
        }).then(function (response) {
            if (response.data.error == false) {
                dispatch(dangKyThanhCong(tendangnhap));
                axios.post('http://localhost:8081/api/theodoi/createuser', {
                    username: tendangnhap
                }).then(function (res) {
                    if (res.data.error == true) {
                        console.log('Tao node user that bai.')
                    }
                })

                axios.post('http://localhost:8083/api/search', {
                    tennguoidung: hoten,
                    tendangnhap: tendangnhap
                }).then(function (res) {
                    if (res.data.error == false) {
                        console.log('Thêm vào es thành công.')
                    }
                })

            } else {
                dispatch(dangKyThatBai());
            }
        })

    }
}

export var layThongTinNguoiDungTC = (nguoidung) => {
    return {
        type: 'LAY_THONG_TIN_NGUOI_DUNG_TC',
        nguoidung
    }
}

export var layThongTinNguoiDung = (tendangnhap) => {
    return (dispatch, getState) => {
        axios.get('http://localhost:8085/api/nguoidung/', {
            params: {
                tendangnhap
            }
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(layThongTinNguoiDungTC(res.data.nguoidung['0']))
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
export var LuuAnhCaNhan = (upload, tendangnhap) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:8085/api/nguoidung/capnhapanhdaidien', {
            url: upload.secure_url,
            tendangnhap: tendangnhap

        }).then(function (response) {
            if (response.data.error == false) {

            } else {
                console.log('Cập nhập ảnh đại diện thất bại')
            }
        })
    }
}

export var taiAnhCaNhan = (files, tendangnhap) => {
    return (dispatch, getState) => {
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
                dispatch(LuuAnhCaNhan(uploaded, tendangnhap));

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
        var maanh_1 = uuid();
        var maanh_2 = maanh_1.split('-');
        var maanh = '';
        for (var i = 0; i < maanh_2.length; i++) {
            maanh = maanh + maanh_2[i];
        }
        var thongtinanh = {
            url,
            camnhan,
            diadanh,
            sohuu
        }
        axios.post('http://localhost:8084/api/anh', {
            maanh,
            thongtinanh
        }).then(function (response) {
            if (response.data.error == false) {
                dispatch(luuAnhThanhCong(url));
            }
        })

        axios.post('http://localhost:8082/api/sohuuanh/', {
            sohuu,
            maanh
        }).then(function (res) {
            if (res.data.error == false) {
                console.log('luu anh vao so huu thanh cong');
            }
        })

        axios.post('http://localhost:8082/api/diadanh/luuAnhVaoDiaDanh', {
            maanh,
            url,
            madiadanh: diadanh,
            sohuu
        }).then(function (res) {
            if (res.data.error == true) {
                console.log('Luu anh vao ds anh trong dia danh that bai');
            }
        })

        axios.post('http://localhost:8081/api/thichanh/createimage', {
            images_id: maanh
        }).then(function (res) {
            if (res.data.error == true) {
                console.log('Tao node anh that bai');
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
        axios.get('http://localhost:8082/api/sohuuanh', {
            params: {
                sohuu
            }
        }).then(function (response) {
            if (response.data.error == false) {
                console.log(response.data.dsAnh);
                dispatch(layAnhThanhCong(response.data.dsAnh));
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

        axios.delete('http://localhost:8082/api/sohuuanh', {
            params: {
                maanh
            }
        }).then(function (response) {
            if (response.data.error == false) {
              dispatch(xoaAnhThanhCong(maanh));
            }
        })

        axios.delete('http://localhost:8081/api/deleteimage', {
            params: {
                images_id: maanh
            }
        }).then(function (res) {
            if (res.data.error == true) {
                console.log('Xoa node anh that bai');
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

            axios.get('http://localhost:8082/api/anh', {
                params: {
                    sohuu: nguoi.nguoitheodoi
                }
            }).then(function (response) {
                    if (response.data.error == false) {
                        console.log(response.data.dsAnh);
                        //dispatch(layAnhNguoiTDTC(response.data.dsAnh));
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
        axios.get('http://localhost:8082/api/diadanh/laydsDiaDanh')
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(layDsDiaDanhTc(response.data.dsDiaDanh));
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
        axios.get('http://localhost:8082/api/diadanh/layDiaDanhTheoMa', {
            params: {
                madiadanh
            }
        }).then(function (response) {
            if (response.data.error == false) {
                dispatch(layDiaDanhTheoMaTC(response.data.tendiadanh));
            }
        })
    }
}

export var themDiaDanh = (madiadanh, tendiadanh) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:8082/api/diadanh/luuDiaDanh', {
            madiadanh,
            tendiadanh
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(layDsDiaDanh());
            }
        })
    }
}

export var xoaDiaDanh = (madiadanh) => {
    return (dispatch, getState) => {
        axios.delete('http://localhost:8082/api/diadanh/xoadiadanh', {
            params: {
                madiadanh
            }
        }).then(function (res) {
            if (res.data.error == false) {
                dispatch(layDsDiaDanh());
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

        axios.get('http://localhost:8081/api/theodoi/suggestfollowing', {
            params: {
                tendangnhap
            }
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
        axios.get('http://localhost:8081/api/theodoi/getfollowing', {
            params: {
                username: tendangnhap
            }
        }).then(function (res) {
            if (res.data.error == false) {
                console.log(res.data);
                dispatch(layNguoiDangTheoDoiTC(res.data.dsTheoDoi))
            } else {
                console.log("lay nguoi theo doi that bai")
            }
        })
    }
}

// export var theoDoiTc = (matheodoi) => {
//     return {
//         type: 'THEO_DOI_TC',
//         matheodoi
//     }
// }

// export var theoDoi = (nguoitheodoi, nguoiduoctheodoi) => {
//     return (dispatch, getState) => {

//         axios.post('http://localhost:8081/api/theodoi/follow', {
//             username: nguoitheodoi,
//             otherusername: nguoiduoctheodoi
//         }).then(function (res) {
//             if (res.data.error == false) {
//                 //dispatch(theoDoiTc(nguoidung))
//             }
//         })
//     }
// }


// export var huyTheoDoiTc = (nguoidung) => {
//     return {
//         type: 'HUY_THEO_DOI_TC',
//         nguoidung
//     }
// }

// export var huyTheoDoi = (nguoitheodoi, nguoiduoctheodoi) => {
//     return (dispatch, getState) => {
//         axios.delete('http://localhost:8081/api/theodoi/unfollow', {
//             params: {
//                 username: nguoitheodoi,
//                 otherusername: nguoiduoctheodoi
//             }
//         }).then(function (res) {
//             if (res.data.error == false) {
//                 console.log("Huy theo doi thanh cong")
//             }
//         })
//     }
// }


// export var demNguoiTheoDoiTC = (soLuong) => {
//     return {
//         type: 'DEM_NGUOI_THEO_DOI',
//         soLuong
//     }
// }

// export var demNguoiTheoDoi = (nguoitheodoi) => {
//     return (dispatch, getState) => {

//         axios.get('http://localhost:8081/api/theodoi/countFollowing', {
//             params: {
//                 otherusername: nguoitheodoi
//             }
//         })
//             .then(function (response) {
//                 if (response.data.error == false) {
//                     dispatch(demNguoiTheoDoiTC(response.data.total));
//                 }
//             })
//     }
// }

export var layGoiYTheoDoiTC = (dsGoiYTheoDoi) => {
    return {
        type: 'DS_GOI_Y',
        dsGoiYTheoDoi
    }
}


export var layGoiYTheoDoi = (tendangnhap) => {
    return (dispatch, getState) => {

        axios.get('http://localhost:8081/api/theodoi/suggestfollowing', {
            params: {
                username: tendangnhap
            }
        })
            .then(function (response) {
                if (response.data.error == false) {
                    dispatch(demNguoiTheoDoiTC(response.data.dsGoiYTheoDoi));
                }
            })
    }
}


// ---- thich anh ---- //

// export var thichAnhTC = () => {
//     return {
//         type: 'THICH_ANH_TC'
//     }
// }

// export var thichAnh = (maanh, nguoithich) => {
//     return (dispatch, getState) => {
//         axios.post('http://localhost:8081/api/thichanh/like', {
//             images_id: maanh,
//             username: nguoithich
//         }).then(function (res) {
//             if (res.data.error == false) {
//                 dispatch(thichAnhTC());
//             }
//         })

//     }
// }

// export var huyThichAnhTC = () => {
//     return {
//         type: 'HUY_THICH_ANH'
//     }
// }

// export var huyThichAnh = (maanh, nguoithich) => {
//     return (dispatch, getState) => {
//         axios.delete('http://localhost:8081/api/thichanh/unlike', {
//             params: {
//                 images_id: maanh,
//                 username: nguoithich
//             }
//         }).then(function (res) {
//             if (res.data.error == false) {
//                 dispatch(huyThichAnhTC());
//             }
//         })
//     }
// }

// export var demSoLuongThichAnh = (maanh) => {
//     return (dispatch, getState) => {
//         axios.get('http://localhost:8081/api/thichanh/countlike', {
//             params: {
//                 images_id: maanh
//             }
//         }).then(function (res) {
//             if (res.data.error == false) {

//             }
//         })
//     }
// }

// export var countFollowingSC = (total) => {
//     return {
//         type: 'COUNT_FOLLOWING',
//         total
//     }
// }

// export var countFollowing = (tendangnhap) => {
//     return (dispatch, getState) => {
//         axios.get('http://localhost:8081/api/theodoi/countFollowing', {
//             params: {
//                 username: tendangnhap
//             }
//         }).then(function (res) {
//             if (res.data.error == false) {
//                 dispatch(countFollowingSC(res.data.total))
//             }
//         })
//     }
// }


// export var countFollowersSC = (total) => {
//     return {
//         type: 'COUNT_FOLLOWERS',
//         total
//     }
// }

// export var countFollowers = (tendangnhap) => {
//     return (dispatch, getState) => {
//         axios.get('http://localhost:8081/api/theodoi/countFollowers', {
//             params: {
//                 otherusername: tendangnhap
//             }
//         }).then(function (res) {
//             if (res.data.error == false) {
//                 dispatch(countFollowingSC(res.data.total))
//             }
//         })
//     }
// }


// ===== search ===== //
// export var searchSC = (dsTimKiem, tendangnhap) => {
//     return {
//         type: 'SEARCH_SUCCESS',
//         dsTimKiem,
//         tendangnhap
//     }
// }

// export var search = (tennguoidung, tendangnhap) => {
//     return (dispatch, getState) => {
//         axios.get('http://localhost:8083/api/search', {
//             params: {
//                 tennguoidung: tennguoidung
//             }
//         }).then(function (res) {
//             if (res.data.error == false) {
//                 console.log(res.data.dsTimKiem)
//                 dispatch(searchSC(res.data.dsTimKiem, tendangnhap))
//             }
//         })
//     }
// }