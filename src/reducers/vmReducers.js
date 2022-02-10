import * as types from '../constants';
const initialState = {
    locations:{},
    vmDataList:{}
};

function configReducer(state = initialState, action) {
    switch (action.type) {
        case types.GETLOCATIONS:
            return {
                ...state, locations: action.data
            }
        case types.GETVMLIST:
            return {
                ...state, vmDataList: action.data
            }
        default:
            return state;
    }
};

export default configReducer;