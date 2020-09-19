import axios from 'axios';

// export const userInfoAction = (phnNumber) => {
//     console.log('we are in user info action');
//     return dispatch => {
//         axios.get('https://jsonplaceholder.typicode.com/todos/1')
//             .then(function (response) {
//                 // handle success
//                 console.log(response.data);
//                 dispatch({type: 'GET_USER_INFO', payload: response.data});
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error);
//             })
//     }
//     // return { type: 'GET_USER_INFO', value: phnNumber }
// }

export const userInfoAction = (phnNumber) => {
    console.log('we are in user info action');
    return (dispatch, getState) => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(function (response) {
                // handle success
                console.log(response.data);
                dispatch({type: 'GET_USER_INFO', payload: response.data});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    // return { type: 'GET_USER_INFO', value: phnNumber }
}