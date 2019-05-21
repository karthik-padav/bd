import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    DatePickerAndroid,
    AsyncStorage,
    FlatList,
    SectionList,
    Modal,
    ScrollView,
    ToastAndroid
} from 'react-native';
// import RNAccountKit from 'react-native-facebook-account-kit';
import {
    Form,
    Label,
    ListItem,
    Left,
    Body,
    List,
    Right,
    Switch,
    Item,
    Input,
    Button,
    Container
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import moment from "moment";
import LocationList from './LocationList';
import GenderList from './GenderList';
import BloodGroupList from './BloodGroupList';
import * as Animatable from 'react-native-animatable';

// import {getLocationList} from '../dataService';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rootPage: this.props.navigation.getParam('rootPage'),
            userInfo: null,
        }
    }
    render() {
        return (
            <Container>
                <View style={{ flexDirection: 'row', backgroundColor: '#fd3c65', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{ padding: 20 }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Icon name="angle-left" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    {this.state.rootPage == 'settings' ? <TouchableOpacity
                        style={{ padding: 20 }}
                        onPress={() => {
                            this.props.navigation.navigate('EditProfile', { rootPage: 'settings' })
                        }}>
                        <Icon name="edit" size={25} color="#ffffff" />
                    </TouchableOpacity> : null}
                </View>
                <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        backgroundColor: '#fd3c65',
                        width: '100%',
                        height: 70
                    }}>
                        {this.state.rootPage == 'settings' ? null : <TouchableOpacity
                            style={{
                                backgroundColor: '#2699fb',
                                height: 60,
                                width: 60,
                                borderRadius: 60 / 2,
                                marginTop: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Icon name="phone" size={30} color="#ffffff" />
                        </TouchableOpacity>}
                        <Animatable.Image
                            animation="bounceIn"
                            iterationCount={1}
                            duration={1500}
                            direction="alternate"
                            style={{
                                height: 150,
                                width: 150,
                                borderRadius: 150 / 2,
                                borderWidth: 5,
                                borderColor: '#ffffff',
                            }}
                            source={require('../assets/img/logo.png')}
                        />
                        {this.state.rootPage == 'settings' ? null : <TouchableOpacity
                            style={{
                                backgroundColor: '#1ebea5',
                                height: 60,
                                width: 60,
                                borderRadius: 60 / 2,
                                marginTop: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Icon name="whatsapp" size={30} color="#ffffff" />
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.container}>
                        <View style={{ justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, fontFamily: 'Raleway-Bold' }}>Karthik Padav</Text>
                            <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'Raleway-Regular' }}>karthikpadav@gmail.com</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, flex: 1 }}>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: 'Raleway-Regular' }}>State:</Text>
                                <Text numberOfLines={1} style={{ fontSize: 20, fontFamily: 'Raleway-Bold' }}>Karnataka</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, textAlign: 'right', fontFamily: 'Raleway-Regular' }}>Location:</Text>
                                <Text numberOfLines={1} style={{ fontSize: 20, fontFamily: 'Raleway-Bold' }}>Mangalore</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, flex: 1 }}>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: 'Raleway-Regular' }}>Gender:</Text>
                                <Text style={{ fontSize: 20, fontFamily: 'Raleway-Bold' }}>Male</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, textAlign: 'right', fontFamily: 'Raleway-Regular' }}>Age:</Text>
                                <Text style={{ fontSize: 20, fontFamily: 'Raleway-Bold' }}>28</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, flex: 1 }}>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: 'Raleway-Regular' }}>Blood group:</Text>
                                <Text style={{ fontSize: 20, fontFamily: 'Raleway-Bold' }}>O+</Text>
                            </View>
                        </View>

                        {this.state.rootPage == 'userList'
                        ?
                        null
                        :
                        <View style={{ marginTop: 30 }}>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: 'Raleway-Regular' }}>Patient info:</Text>
                                <Text style={{ fontSize: 16, fontFamily: 'Raleway-Regular' }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Text>
                            </View>
                        </View>
                        }

                    </View>
                </ScrollView>
            </Container>
        );
    }



    componentWillMount() {
        console.log(this.state.rootPage);
        if (this.state.rootPage == 'settings') {
            this.setState({ userInfo: this.props.userInfo }, function () {
                console.log(this.state.userInfo);
            })
        } else if (this.state.rootPage == 'userList') {

        }
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50
    },
    modal_b_type_btn: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        // backgroundColor: '#fd3c65',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderWidth: 1,
        borderColor: '#fd3c65',
        marginBottom: 30
    },
    modal_b_type_title: {
        color: '#fd3c65',
        fontSize: 17,
        fontFamily: 'Raleway-Regular'
    }
});
