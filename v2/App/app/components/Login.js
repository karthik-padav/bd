/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    AsyncStorage,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Button
} from 'native-base';
import RNAccountKit from 'react-native-facebook-account-kit';
import {getPhoneNumber,checkUserExist} from '../dataServices';
import Loader from './Loader';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import * as firebase from 'firebase';
import 'firebase/firestore';

class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerMode: 'none',
        headerVisible: false,
    });
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <TouchableOpacity onPress={()=>this.login()}> */}
                <ImageBackground
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                    source={require('../assets/img/bg.png')}>
                    <View
                        style={{
                            flex: 0.7,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Animatable.Text
                            animation="bounceInRight"
                            iterationCount={1}
                            duration={3000}
                            direction="alternate"
                            style={{
                                fontSize: 40,
                                lineHeight: 42,
                                fontFamily: 'Raleway-BoldItalic',
                                color: '#ffffff'
                            }}>
                            Lets help to</Animatable.Text>
                        <Animatable.Text
                            animation="bounceInRight"
                            iterationCount={1}
                            duration={3000}
                            direction="alternate"
                            style={{
                                fontSize: 40,
                                lineHeight: 42,
                                fontFamily: 'Raleway-BoldItalic',
                                color: '#ffffff'
                            }}>
                            save a life</Animatable.Text>
                    </View>
                    <Animatable.View
                        animation="bounceInUp"
                        iterationCount={1}
                        delay={500}
                        duration={3000}
                        direction="alternate"
                        style={{
                            flex: 0.3,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}>
                        <Button
                            onPress={() => this.getStarted()}
                            rounded
                            bordered
                            style={{
                                borderColor: '#fd3c65',
                                marginBottom: 30
                            }}>
                            <Text style={{
                                fontFamily: 'Raleway-Regular',
                                fontSize: 20,
                                color: '#fd3c65',
                                paddingVertical: 20,
                                paddingHorizontal: 30,
                            }}>Get Started</Text>
                        </Button>
                    </Animatable.View>
                            <Loader />
                </ImageBackground>
                {/* </TouchableOpacity> */}
            </View>
        );
    }

    componentDidMount() {
        // Configures the SDK with some options
        RNAccountKit.configure({
            responseType: 'token', // 'token' by default,
            // titleType: 'login',
            initialAuthState: '',
            initialPhoneCountryPrefix: '+91', // autodetected if none is provided
            initialPhoneNumber: '9538001583',
            // getACallEnabled: true
        })
    }

    getStarted() {
        console.log('getStarted');
        // const phone_number = "+919538001586";
        // Shows the Facebook Account Kit view for login via SMS
        RNAccountKit.loginWithPhone()
            .then((token) => {
                if (!token) {
                    console.log('Login cancelled');
                } else {
                    // Get phone number
                    getPhoneNumber(token.token)
                        .then(res => {
                            console.log('getPhoneNumber');
                            console.log(res.phone.number);
                            this.props.onUserInfoChange('set_phone_number', res.phone.number)
                            // Check whether phone number exist in database
                            checkUserExist(res.phone.number)
                            .then(res => {
                                console.log('res');
                                console.log(res.status);
                                if(res.status){
                                    this.props.navigation.navigate('App');
                                } else {
                                    this.props.navigation.navigate('EditProfile');
                                }
                            })
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            })
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
