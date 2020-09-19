/**</View>
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';

class Loader extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: '#00000080',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        fontFamily: 'Raleway-Regular',
                        color: '#242729',
                        alignItems: 'center',
                        borderRadius: 4
                    }}>
                    <ActivityIndicator size="large" color="#fd3c65" />
                    <Text style={{ paddingLeft: 20, fontSize: 17 }}>Loading...</Text>
                </View>
            </View>
        )
    }
}
export default Loader

const styles = StyleSheet.create({
    container: {
        //   flex: 1,
        backgroundColor: 'red',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        position: 'absolute'
    },
    horizontal: {
        justifyContent: 'space-around',
        padding: 10
    }
})