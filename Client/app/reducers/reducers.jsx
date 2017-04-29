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


export var ImageReducer = (state = {isUpload: false, dsAnh: [], isSaving: false,isGetting: false, dsAnhDaLuu: []}, action) => {
    switch (action.type) {
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
            //var updateds = Object.create([], update);
            return {
                ...state,
                dsAnhDaLuu: update

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




export var usersReducer = (state = {isGetting: false, listUsers: [], followers: []}, action) => {
    switch (action.type) {
        case 'GET_LIST_USERS':
            return state;
        default: 
            return state;
    }
}

export var followerReducer = (state ={listFollower: []}, action) => {
    switch(action.type) {
        case 'GET_FOLLOWER':
            listFollower = action.followers;
            return state;
        default: 
            return state;
    }
}
