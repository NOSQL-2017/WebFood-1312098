var redux = require('redux');
var {imagesReducer, uploadImageReducer, pressButtonReducer, pressButtonFuncReducer, loginReducer } = require('reducers');
var thunk = require('redux-thunk').default;

export var configure = () => {
    var reducer = redux.combineReducers({
        button: pressButtonReducer,
        buttonFunc: pressButtonFuncReducer,
        login: loginReducer,
        uploadImage: uploadImageReducer,
        handleImages: imagesReducer
    });

    var store = redux.createStore(reducer,redux.applyMiddleware(thunk));

    return store;
}