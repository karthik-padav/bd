import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';

// import * as firebase from 'firebase';
// import 'firebase/firestore';
import { connect } from 'react-redux';
import {checkUserExist} from '../dataServices';
import {userInfoAction} from '../Store/Action/userInfoAction';
import {store} from '../Store/store';

import * as firebase from 'firebase';
import 'firebase/firestore';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.fetchFromLocalStorage();
  }

  // Fetch the phone number from storage then navigate to our appropriate place
  // fetchFromLocalStorage = async () => {
  fetchFromLocalStorage = () => {
  // fetchFromLocalStorage() {
    // const phone_number = await AsyncStorage.getItem('phone_number');
    const phone_number = "+919538001583";
    console.log('phone_number');
    console.log(phone_number);

    if (phone_number) {
      // console.log('user_id is');
      // console.log(phone_number);

      // this.props.navigation.navigate('App');
      // this.props.getUserInfo(phone_number);
      store.dispatch(userInfoAction(phone_number)).then(() => {
        console.log('Doneasd!');
      });
      console.log(this.props.userInfo);
      setTimeout(() => {
        console.log('--------');
        console.log(this.props.userInfo);
        console.log('--------');
      }, 1000);
    } else {
      console.log('no user_id');
      // this.props.navigation.navigate('Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
        <ActivityIndicator size="large" color="#fd3c65" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: (value) => { dispatch(userInfoAction(value))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)
// export default AuthLoading