var axios = require('axios');
// Login
export var resetButton = () => {
    return {
        type: 'RESET_BUTTON'
    }
}

export var pressLogin = () => {
    return {
        type: 'PRESS_LOGIN'
    }
};

export var pressSignup = () => {
    return {
        type: 'PRESS_SIGNUP'
    }
};

export var pressUpload = () => {
    return {
        type: 'PRESS_UPLOAD'
    }
};

export var resetButtonFunc = () => {
    return {
        type: 'RESET_BUTTON_FUNC'
    }
}


// kiem tra dang nhap
export var resetLogin = () => {
    return {
        type: 'RESET_LOGIN'
    }
}

export var startLoginFetching = () => {
    return {
        type: 'START_LOGIN_FETCH'
    }
}

export var loginSuccess = (username) => {
    return {
        type: 'LOGIN_SUCCESS',
        username
    }
}


export var loginFailed = () => {
    return {
        type: 'LOGIN_FAILED'
    }
}


export var fetchLogin = (username, password) => {
    var tenDangNhap = username;
    var matKhau = password
    return (dispatch, getState) => {
        dispatch(startLoginFetching());
        axios.post('http://localhost:8080/api/login', {
            tenDangNhap: tenDangNhap,
            matKhau: matKhau
        }).then(function(res) {
            if (res.data.error == false) {
                dispatch(loginSuccess(tenDangNhap));
            } else {
                dispatch(loginFailed());
            }
        })
    }
}


// upload images
export var resetStateUpload = () => {
    return {
        type: 'RESET_STATE_UPLOAD'
    }
}
export var startUploadImages = () => {
    return {
        type: 'START_UPLOAD_IMAGES'
    }
}

export var completedUpload = () => {
    return {
        type: 'COMPLETED_UPLOAD_IMAGES'
    }
}

// save link images and owners images to postgres
export var resetStateImage = () => {
    return {
        type:  'RESET_STATE_IMAGES'
    }
}
export var startSaveImagesToPg = () => {
    return {
        type: 'START_SAVE_URL_IMAGES',
    }
}

export var completedSaveImagesToPg = () => {
    return {
        type: 'COMPLETED_SAVE_URL_IMAGES'
    }
}

export var failedSaveImagesToPg = () => {
    return {
        type: 'FAILED_SAVE_URL_IMAGES'
    }
}

export var saveImageToPg = (username, urls) => {
    return (dispatch, getState) => {
        dispatch(startSaveImagesToPg());

        axios.post('http://localhost:8080/api/images', {
            username: username,
            urls: urls
        }).then(function(res) {
            if (res.data.error == false) {
                console.log('Thanh Cong');
                dispatch(completedSaveImagesToPg());
            } else {
                dispatch(failedSaveImagesToPg());
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
        }).then(function(res) {
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
        }).then(function(res) {
            if (res.data.error == false) {
                console.log("Thanh Cong");    
            }
        })
    }
}

