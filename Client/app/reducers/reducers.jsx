var uuid = require('node-uuid');
var moment = require('moment');

export var giaoDienReducer = (state = false, action ) => {
    switch(action.type) {
        case 'DOI_GIAO_DIEN':
            return !state;
        default: 
            return state;
    }
}

export var nguoidungReducer = (state = {isLogin: false,tendangnhap: '', kiemtra: false, dangky: 0, dangnhap: 0 }, action) => {
    switch(action.type) {
        case 'KIEM_TRA_DANG_KY':
            return {
                ...state,
                kiemtra: true
            }
        case 'DANG_KY_THANH_CONG':
            return {
                ...state,
                kiemtra: false,
                tendangnhap: action.tendangnhap,
                dangky: 1,
                isLogin: true
            }
        case 'DANG_KY_THAT_BAI':
            return {
                ...state,
                kiemtra: false,
                dangky: 2
            }
        case 'KIEM_TRA_DANG_NHAP':
            return {
                ...state,
                kiemtra: true
            }
        case 'DANG_NHAP_THANH_CONG':
            return {
                ...state,
                kiemtra: false,
                dangnhap: 1,
                isLogin: true,
                tendangnhap: action.tendangnhap
            }
        case 'DANG_NHAP_THAT_BAI':
            return {
                ...state,
                kiemtra: false,
                dangnhap: 2
            }
        case 'DANG_XUAT':
            return {
                ...state,
                isLogin: false,
                dangnhap: 0,
                dangky: 0
            }
        default: 
            return state;
    }
}


export var ImageReducer = (state = {isUpload: false, dsAnh: [], isSaving: false,isGetting: false, dsAnhDaLuu: [], dsAnhNguoiTheoDoi: []}, action) => {
    switch (action.type) {
        case 'RESET_IMAGE_REDUCER': 
            return {
                ...state,
                isUpload: false,
                dsAnh: [],
                isSaving: false,
                isGetting: false, 
                dsAnhDaLuu: [], 
                dsAnhNguoiTheoDoi: []

            }
        case 'BAT_DAU_TAI_ANH':
            return {
                ...state,
                isUpload: true
            }
        case 'TAI_ANH_THANH_CONG':
            return {
                ...state,
                isUpload: false,
                dsAnh: [
                    ...state.dsAnh,
                    action.anh
                ]
            }
        case 'LUU_ANH_TC':
            var update = state.dsAnh.filter( (e) => {
                return e.secure_url != action.url;
            })
            return {
                ...state,
                dsAnh: update
            } 
        case 'BD_LAY_ANH':
            return {
                ...state,
                isGetting: true
            }
        case 'LAY_ANH_TC': 
            return {
                ...state,
                isGetting: false,
                dsAnhDaLuu: action.dsAnhDaLuu
            }
        case 'XOA_ANH_TC':
            var update = state.dsAnhDaLuu.filter( (e) => {
                return e.maanh != action.maanh;
            })
            return {
                ...state,
                dsAnhDaLuu: update

            }
        case 'RESET_ANH_NGUOI_TD':
            return {
                ...state,
                dsAnhNguoiTheoDoi: []
            }
         case 'LAY_DS_ANH_NGUOI_TD_TC':
            console.log(state.dsAnhNguoiTheoDoi);
            var updateds = state.dsAnhNguoiTheoDoi;
            if (action.dsAnh.length > 0) {
                action.dsAnh.forEach(function(element) {
                    updateds.push(element)
                }, this);
            }
            return {
                ...state,
                dsAnhNguoiTheoDoi: updateds
            }
         case 'RESET_ANH_THEO_DOI':
            return {
                ...state,
                dsAnhNguoiTheoDoi:[]
            }
        default:
            return state;
    }
}

export var diaDanhReducer = (state = {dsDiaDanh: [], tenDiaDanh: ''}, action) => {
    switch(action.type) {
        case 'LAY_DS_DIA_DANH':
            return {
                ...state,
                dsDiaDanh: action.dsDiaDanh
            }
        case 'LAY_DIA_DANH_THEO_MA':
            return {
                ...state,
                tenDiaDanh: action.tenDiaDanh
            }
        default:
            return state;
    }
}




/// ----- followerReducer -------------///

export var theoDoiReducer = (state = {dsGoiY: [], dsDangTheoDoi: [], soNguoiTheoDoi: 0}, action) => {
    switch(action.type) {
        case 'RESET_THEO_DOI_REDUCER':
            return {
                dsGoiY: [], 
                dsDangTheoDoi: [], 
                soNguoiTheoDoi: 0
            }
        case 'LAY_NGUOI_THEO_DOI_TC':
            return {
                ...state,
                dsGoiY: action.dsGoiYTheoDoi
            }
        case 'LAY_NGUOI_DANG_THEO_DOI_TC':
            return {
                ...state,
                dsDangTheoDoi: action.dsNguoiDangTheoDoi
            }
        case 'THEO_DOI_TC':
           return state;
        case 'HUY_THEO_DOI_TC':
            console.log(state.dsDangTheoDoi);
              var update = state.dsDangTheoDoi.filter( e => {
                return e.nguoitheodoi !== action.nguoidung;
            })
            console.log('update ds theo doi', update)
                return {
                    ...state,
                    dsDangTheoDoi: update
                }
        case 'DEM_NGUOI_THEO_DOI':
            return {
                ...state,
                soNguoiTheoDoi: action.soLuong
            }
        default:
            return state;
    }
}