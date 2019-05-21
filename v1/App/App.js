/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';

import Login from './app/components/Login';
import Home from './app/components/Home';
import List from './app/components/List';
import Register from './app/components/Register';

import {MainRouter} from './app/router';

import * as firebase from 'firebase';
import 'firebase/firestore';

const initialState = {
  userInfo: {
    gender: null,
    profileImage: null,
    name: null,
    // phone_number: '+919538001583',
    phone_number: null,
    DOB: null,
    location: null,
    blood_group: null,
    email: null,
    user_id: null,
    isVolunteer: false,
    login_source: null,
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
    // case 'profile_image_change':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.profileImage = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'name_change':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.name = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'DOB':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.DOB = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'location':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.location = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'blood_group':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.blood_group = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'phone_number':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.phone_number = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'email_id':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.email_id = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'gender':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.gender = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'selected_location':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.location = action.data
    //   return{userInfo: userInfo}
    // }
    // case 'is_volunteer':{
    //   let userInfo = {...state.userInfo}
    //   userInfo.isVolunteer = action.data
    //   return{userInfo: userInfo}
    // }
    case 'set_user_info':{
      return{userInfo: action.data}
    }
  }
  return state
}

const store = createStore(reducer)
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
