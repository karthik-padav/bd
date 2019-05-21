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

import * as firebase from 'firebase';
import 'firebase/firestore';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.userCheck();
  }

  // Fetch the phone number from storage then navigate to our appropriate place
  userCheck = async () => {
  // userCheck() {
    const phone_number = await AsyncStorage.getItem('phone_number');
    // const phone_number = "+919538001583";

    if (phone_number) {
      console.log('user_id is');
      console.log(phone_number);
      // if phone number exist in localStorage
      // Check whether phone number exist in database
      checkUserExist(phone_number)
      .then(res => {
          console.log('res');
          console.log(res.status);
          if(res.status){
              this.props.navigation.navigate('App');
          } else {
              this.props.navigation.navigate('Auth');
          }
      })
    } else {
      console.log('no user_id');
      this.props.navigation.navigate('Auth');
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
    onUserInfoChange: (type, value) => { dispatch({ type: type, data: value }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)