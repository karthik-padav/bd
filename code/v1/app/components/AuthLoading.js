import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import {connect} from 'react-redux';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.userCheck();
  }

  // Fetch the phone number from storage then navigate to our appropriate place
  userCheck = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log(user_id);

    if(user_id){
      console.log('user_id is');
      console.log(user_id);
      // Check whether phone number exist in database
      // if so redirect them to home page
      // else redirect them to login page
      firebase.firestore().collection("users")
      .where("user_id", "==", user_id)
      .onSnapshot(querySnapshot => {
          let userInfo = querySnapshot.docs.map(doc => doc.data());
          if(userInfo.length>0){
            this.props.onUserInfoChange('set_user_info', userInfo[0])
            // console.log(userInfo[0]);
            console.log(this.props.userInfo);
            this.props.navigation.navigate('App');
          } else {
            AsyncStorage.removeItem('user_id');
            this.props.navigation.navigate('Auth');
          }
      })
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    } else {
      console.log('no user_email');
      this.props.navigation.navigate('Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
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

function mapDispatchToProps(dispatch){
  return{
      onUserInfoChange: (type, value) => {dispatch({type:type, data: value})},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)