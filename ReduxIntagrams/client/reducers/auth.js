import { SET_CURRENT_USER, TIM_KIEM_NGUOI_DUNG } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  dsKetQua: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case TIM_KIEM_NGUOI_DUNG: {
      let fil = [];
      if (action.data != null) {
        console.log(action.data);
        fil = action.data.filter(e => {
          return e._source.tendangnhap != state.user.username
        })
      }
      return {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        dsKetQua: fil
      }
    }
    default: return state;
  }
}
