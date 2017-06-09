import { UPLOAD_IMAGES_SUCCESS, REMOVE_IMAGE } from '../actions/types';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';
import remove from 'lodash/remove';




export default  (state = {listImagesUpload: [], listImages: []}, action) => {
    switch (action.type) {
        case UPLOAD_IMAGES_SUCCESS:
            var update = state.listImagesUpload || [];
            update.push({
                id: shortid.generate(),
                image: action.image
            })

            return {
                listImagesUpload: update
            }
        case REMOVE_IMAGE: 
            var update = state.listImagesUpload || [];
            var newList = update.filter(function(el) {
                return el.id != action.id;
            });
            return {
                listImagesUpload: newList
            }
        case LAY_DS_ANH_SH:
            var update = action.dsAnh || [];
            return {
                listImages: update
            }
        case XOA_ANH_SH: 
            var update = state.listImages.filter(function(el) {
                return el.maanh != action.maanh;
            })
            return {
                listImages: update
            }
        default: return state;
    }
}
