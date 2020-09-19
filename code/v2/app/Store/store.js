import { createStore, combineReducers, applyMiddleware } from 'redux';
import userInfoReducer from './Reducer/userInfoReducer';
import thunk from 'redux-thunk';

export const initialState = {
    'userInfo': {},
    'isLoading': false,
    'toastMessage': {
        display: false,
        message: ''
    }
}

export const store = createStore(userInfoReducer, applyMiddleware(thunk));