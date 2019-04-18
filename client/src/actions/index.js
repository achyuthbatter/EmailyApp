import axios from 'axios';
import * as ActionTypes from './types';

// export const fetchUser = () => {
//     return function(dispatch){
//         axios
//             .get('/api/currentuser')
//             .then(res => dispatch({ type: ActionTypes.FETCH_USER, payload: res }));
//     };
// };

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/currentuser');
    dispatch({ type: ActionTypes.FETCH_USER, payload: res.data });
};

export const handleStripeToken = (token) => async dispatch =>{
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: ActionTypes.FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch =>{
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type:ActionTypes.FETCH_USER, payload: res.data });
};

export const fetchSurvey = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({type: ActionTypes.FETCH_SURVEYS, payload: res.data });
}

export const deleteSurvey = () => async dispatch => {
    console.log('inside');

    const res = await axios.get('/api/surveys/delete/one');
    dispatch({ type: ActionTypes.FETCH_SURVEYS, payload: res.data });
}