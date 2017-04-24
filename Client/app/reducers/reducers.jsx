var uuid = require('node-uuid');
var moment = require('moment');


export var pressButtonReducer = (state = 0, action) => {
    switch(action.type) {
        case 'RESET_BUTTON':
            state = 0;
            return state;
        case 'PRESS_LOGIN':
            state = 1;
            return state;
        case 'PRESS_SIGNUP':
            state = 2;
            return state;
        default:
            return state;
    }
}

export var pressButtonFuncReducer = (state = 0, action) => {
    switch(action.type) {
        case 'RESET_BUTTON_FUNC':
            state = 0;
            return state;
        case 'PRESS_UPLOAD':
            state = 3;
            return state;
        default:
            return state;
    }
}

export var loginReducer = (state = {isLogin: 0, username: undefined,isFetching: false}, action) => {
    switch(action.type) {
        case 'RESET_LOGIN':
            return {
                isLogin: 0,
                username: undefined,
                isFetching: false
            }
        case 'START_LOGIN_FETCH':
            return {
                isLogin: 0,
                unsername: undefined,
                isFetching: true
            }
        case 'LOGIN_SUCCESS':
            return {
                isFetching: false,
                isLogin: 1,
                username: action.username
            }
        case 'LOGIN_FAILED': 
            return {
                isFetching: false,
                isLogin: 2,
                username: undefined
            }
        default: 
            return state;
    }
}


export var uploadImageReducer = (state = {isUpload: 0}, action) => {
    switch (action.type) {
        case 'RESET_STATE_UPLOAD':
            state.isUpload = 0;
            return state;
        case 'START_UPLOAD_IMAGES':
            state.isUpload = 1;
            return state;
        case 'COMPLETED_UPLOAD_IMAGES':
            state.isUpload = 2;
            return state;
        default:
            return state;
    }
}

export var imagesReducer = (state = {isSaving: false, error: false, isGetting: false, images: []}, action) => {
    switch (action.type) {
        case 'RESET_STATE_IMAGES':
            state.isSaving = false;
            state.error = false;
            return state;
        case 'START_SAVE_URL_IMAGES':
            state.isSaving = true;
            return state;
        case 'COMPLETED_SAVE_URL_IMAGES':
            state.isSaving = false;
            return state;
        case 'FAILED_SAVE_URL_IMAGES':
            state.error = true;
            return state;
        case 'START_GET_IMAGES':
            state.isGetting = true;
            return state;
        case 'COMPLETED_GET_IMAGES':
            state.isGetting = false;
            state.images = action.images;
            return state;
        case 'FAILED_GET_IMAGES':
            state.error = true;
            return state;
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
