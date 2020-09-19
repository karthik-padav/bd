import initialState from '../store';

export default userInfoReducer = (state = initialState, action) => {
    const newState = {...state};
    console.log('we are in user info reducer');
    switch (action.type) {
        case 'GET_USER_INFO':
            newState.userInfo = action.payload;
            console.log('we are in GET_USER_INFO')
            break;
        default:
            return newState
    }
    return newState;
}