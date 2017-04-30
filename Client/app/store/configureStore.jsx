var redux = require('redux');
var {theoDoiReducer,diaDanhReducer, ImageReducer, nguoidungReducer, giaoDienReducer} = require('reducers');
var thunk = require('redux-thunk').default;

export var configure = () => {
    var reducer = redux.combineReducers({
        nguoidung: nguoidungReducer,
        Images: ImageReducer,
        giaodien: giaoDienReducer,
        diadanh: diaDanhReducer,
        theodoi: theoDoiReducer
    });

    var store = redux.createStore(reducer,redux.applyMiddleware(thunk));

    return store;
}