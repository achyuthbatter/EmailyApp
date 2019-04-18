import * as ActionTypes from '../actions/types';

export default function(state = null, action){
    // console.log(action.payload || false);
    switch(action.type){
        case ActionTypes.FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}