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
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    AsyncStorage
} from 'react-native';
import {
    Container,
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getUserInfo} from '../dataServices';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bloodGroup: [{ type: "A+" }, { type: "O+" }, { type: "B+" }, { type: "AB+" }, { type: "B" },
            { type: "A-" },
            { type: "O-" },
            { type: "B-" },
            { type: "AB-" },
            ]
        }
    }
    render() {
        return (
            <Container>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal:20,paddingVertical:15 }}
                        onPress={() => {
                            this.props.navigation.navigate('Settings');
                        }}>
                        <Icon name="cog" size={30} color="#fd3c65" />
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 20}}>
                    <View style={{ marginBottom: 45, marginTop: 0 }}>
                        <Animatable.Text
                            animation="bounceInRight"
                            iterationCount={1}
                            duration={1000}
                            direction="alternate"
                            style={{
                                fontSize: 35,
                                lineHeight: 37,
                                fontFamily: 'Raleway-BoldItalic',
                                color: '#242424'
                            }}>Lets help to</Animatable.Text>
                        <Animatable.Text
                            animation="bounceInRight"
                            iterationCount={1}
                            duration={1000}
                            direction="alternate"
                            style={{
                                fontSize: 35,
                                lineHeight: 37,
                                fontFamily: 'Raleway-BoldItalic',
                                color: '#242424'
                            }}>save a life</Animatable.Text>
                    </View>

                    <FlatList
                        data={this.state.bloodGroup}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        columnWrapperStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this.selectedBloodGroup(item.type)} style={styles.b_type_btn}>
                                <Text style={styles.b_type_title}>{item.type}</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </Container>
        );
    }

    selectedBloodGroup(bloodGroup) {
        console.log(bloodGroup);
        this.props.navigation.navigate('UserList');
    }

    componentDidMount = async () => {
        // userCheck() {
          const phone_number = await AsyncStorage.getItem('phone_number');
          // const phone_number = "+919538001583";
          console.log(phone_number);
        console.log('componentDidMount');
        AsyncStorage.setItem('phone_number', this.props.userInfo.phone_number);
        getUserInfo(this.props.userInfo.phone_number).then(res => {
            console.log('Home res');
            console.log(res);
            this.props.onUserInfoChange('fetch_user_data', res[0])
        })
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    b_type_btn: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderWidth: 1,
        borderColor: '#fd3c65',
        marginBottom: 30
    },
    b_type_title: {
        color: '#fd3c65',
        fontSize: 17,
        fontFamily: 'Raleway-Bold'
    }
});
