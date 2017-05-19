var redux = require('redux');
var {searchReducer,theoDoiReducer,diaDanhReducer, ImageReducer, nguoidungReducer, giaoDienReducer} = require('reducers');
var thunk = require('redux-thunk').default;

export var configure = () => {
    var reducer = redux.combineReducers({
        nguoidung: nguoidungReducer,
        Images: ImageReducer,
        giaodien: giaoDienReducer,
        diadanh: diaDanhReducer,
        theodoi: theoDoiReducer,
        timkiem: searchReducer
    });

    var store = redux.createStore(reducer,redux.applyMiddleware(thunk));

    return store;
}