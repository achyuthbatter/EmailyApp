import * as ActionTypes from '../actions/types';

export default function(state = [], action){
    // console.log(action.payload || false);
    switch(action.type){
        case ActionTypes.FETCH_SURVEYS:
            return action.payload;
        case ActionTypes.DELETE_SURVEY:
            return action.payload;
        default:
            return state;
    }
}