/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage,
    TouchableOpacity,
    View
} from 'react-native';
// import RNAccountKit from 'react-native-facebook-account-kit';
import {getPhoneNumber} from '../dataService';
import {
    Button,
    Icon,
} from 'native-base';
import {connect} from 'react-redux';
import Home from './Home';
import Register from './Register';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginManager } from "react-native-fbsdk";
import { LoginButton, AccessToken } from 'react-native-fbsdk';


class Login extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.signup()}>
                <Image
                    style={{
                        height: 100,
                        width: 100
                    }}
                    source={require('../assets/img/logo.png')} />
                </TouchableOpacity>

<TouchableOpacity onPress={()=>this.googleSignIn()}>
    <Text>Sign in with google</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>this.googleSignOut()}>
    <Text>SignOut in with google</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>this.facebookSignIn()}>
    <Text>Sign in with facebook</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>this.facebookSignOut()}>
    <Text>SignOut in with facebook</Text>
</TouchableOpacity>
            </View>
    );
  }

    componentDidMount() {

        // Configures the SDK with some options
        // RNAccountKit.configure({
        //     responseType: 'token', // 'token' by default,
        //     // titleType: 'login',
        //     initialAuthState: '',
        //     initialPhoneCountryPrefix: '+91', // autodetected if none is provided
        //     initialPhoneNumber: '9538001583',
        //     // getACallEnabled: true
        // })


        // Google sign in
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '303245309190-q65ffqf9keipkshtpe5m0dacu1khutr0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            // hostedDomain: '', // specifies a hosted domain restriction
            // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            // accountName: '', // [Android] specifies an account name on the device that should be used
          });
    }

        signup() {
            // Shows the Facebook Account Kit view for login via SMS
            // RNAccountKit.loginWithPhone()
            //     .then((token) => {
            //         if (!token) {
            //             console.log('Login cancelled');
            //         } else {
            //             // Get phone number
            //             getPhoneNumber(token.token)
            //             .then(res => {
            //                 this.props.phoneNumber('phone_number', res.phone.number);
            //                 // Check whether phone number exist in database
            //                 firebase.firestore().collection("users")
            //                 .where("phone_number", "==", res.phone.number)
            //                 .onSnapshot(querySnapshot => {
            //                     let userInfo = querySnapshot.docs.map(doc => doc.data());
            //                     // if so redirect them to home page
            //                     // else redirect them to registration page
            //                     if(userInfo.length>0){
            //                         AsyncStorage.setItem('phone_number', res.phone.number);
            //                         this.props.navigation.navigate('App');
            //                     } else {
            //                         this.props.navigation.navigate('Register');
            //                     }
            //                 })
            //             })
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
        }

        googleSignIn = async () => {
            try {
                await GoogleSignin.hasPlayServices();
                let googleUserInfo = await GoogleSignin.signIn();

                // Check if user exist
                firebase.firestore().collection("users")
                .where("email", "==", googleUserInfo.user.email)
                .onSnapshot(querySnapshot => {
                    let dbUserInfo = querySnapshot.docs.map(doc => doc.data());
                    if(dbUserInfo.length>0){
                        console.log('User is on db');
                        this.props.onUserInfoChange('set_user_info', dbUserInfo[0]);
                        console.log(this.props.userInfo);
                        AsyncStorage.setItem('user_id', this.props.userInfo.user_id);
                        this.props.navigation.navigate('App');
                    } else {
                        console.log('User is not on db');
                        let userInfo = {...this.props.userInfo}
                        userInfo.name = googleUserInfo.user.name;
                        userInfo.email = googleUserInfo.user.email;
                        userInfo.user_id = googleUserInfo.user.id;
                        userInfo.profileImage = googleUserInfo.user.photo;
                        this.props.onUserInfoChange('set_user_info', userInfo);
                        // Store to firebase
                        var newUserRef = firebase.firestore().collection("users").doc();
                        newUserRef.set(this.props.userInfo)
                        .then(function(docRef) {
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                    }
                })
            } catch (error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                } else {
                // some other error happened
                }
            }
        }

        // googleSignOut = async () => {
        //     try {
        //       await GoogleSignin.revokeAccess();
        //       await GoogleSignin.signOut();
        //     //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
        //     } catch (error) {
        //       console.error(error);
        //     }
        // }

        // facebookSignIn(){
        //     console.log('facebook');
        //     LoginManager.logInWithReadPermissions(["public_profile"]).then(
        //         function(result) {
        //           if (result.isCancelled) {
        //             console.log("Login cancelled");
        //           } else {
        //             console.log(
        //               "Login success with permissions: " +
        //                 result.grantedPermissions.toString()
        //             );
        //           }
        //         },
        //         function(error) {
        //           console.log("Login fail with error: " + error);
        //         }
        //       );
        // }

        // facebookSignOut(){
        //     console.log('facebook');
        // }
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
