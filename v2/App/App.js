import React, {Component} from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';

// import {MainRouter} from './app/router';

import Home from './app/components/Home';
import EditProfile from './app/components/EditProfile';
import Login from './app/components/Login';
import UserList from './app/components/UserList';
import UserProfile from './app/components/UserProfile';
import AuthLoading from './app/components/AuthLoading';
import {MainRouter} from './app/router';

import * as firebase from 'firebase';
import 'firebase/firestore';

const initialState = {
  userInfo: {
    gender: '',
    profileImage: null,
    name: '',
    phone_number: '',
    DOB: '',
    location: '',
    blood_group: '',
    email_id: '',
    user_id: '',
    isVolunteer: false,
    login_source: '',
  }
}

// Color code
// red: #fd3c65
// red disabled: #fd3c657d
// text gray: #9199a1
// text black: #242729
// link blue: #2699fb

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case 'fetch_user_data':{
        let userInfo = action.data
        console.log('fetch_user_data');
        console.log(userInfo);
        return{userInfo: userInfo}
    }
    case 'set_phone_number':{
        let userInfo = {...state.userInfo}
        userInfo.phone_number = action.data
        console.log(userInfo);
        return{userInfo: userInfo}
    }
    case 'profile_image_change':{
        let userInfo = {...state.userInfo}
        userInfo.profileImage = action.data
        console.log(userInfo);
        return{userInfo: userInfo}
    }
    case 'name_change':{
        let userInfo = {...state.userInfo}
        userInfo.name = action.data
        console.log(userInfo);
        return{userInfo: userInfo}
    }
    case 'email_id':{
      let userInfo = {...state.userInfo}
      userInfo.email_id = action.data
      console.log(userInfo);
      return{userInfo: userInfo}
    }
    case 'selected_location':{
      let userInfo = {...state.userInfo}
      userInfo.location = action.data
      console.log(userInfo);
      return{userInfo: userInfo}
    }
    case 'gender':{
      let userInfo = {...state.userInfo}
      userInfo.gender = action.data
      console.log(userInfo);
      return{userInfo: userInfo}
    }
    case 'DOB':{
      let userInfo = {...state.userInfo}
      userInfo.DOB = action.data
      console.log(userInfo);
      return{userInfo: userInfo}
    }
    case 'blood_group':{
      let userInfo = {...state.userInfo}
      userInfo.blood_group = action.data
      console.log(userInfo);
      return{userInfo: userInfo}
    }
    case 'is_volunteer':{
      let userInfo = {...state.userInfo}
      userInfo.isVolunteer = action.data
      console.log(userInfo);
      return{userInfo: userInfo}
    }
  }
  return state
}

const store = createStore(reducer)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Profile /> */}
        <MainRouter />
      </Provider>
    );
  }
  componentWillMount(){
    if (!firebase.apps.length) {
    // Initialize Cloud Firestore through Firebase
      firebase.initializeApp({
          apiKey: "AIzaSyAatm2TY3wKAd4Y9Q7WlAfaGB13BpdV5Jw",
          authDomain: "b-donation-11e63.firebaseapp.com",
          projectId: "b-donation-11e63",
      });
    }
  }
}
