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
    Container,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import moment from "moment";
import LocationList from './LocationList';
import GenderList from './GenderList';
import BloodGroupList from './BloodGroupList';
import {createUser} from '../dataServices';

import * as firebase from 'firebase';
import 'firebase/firestore';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


class EditProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerTintColor: '#fd3c65',
        headerLeft: (
            <TouchableOpacity style={{ padding: 20 }}
                onPress={() => {
                    navigation.goBack()
                }}>
                <Icon name="angle-left" size={30} color="#fd3c65" />
            </TouchableOpacity>
        ),
    });
    constructor(props) {
        super(props);
        this.state = {
            dropDownModalVisible: false,
            filterType: null,
            rootPage: this.props.navigation.getParam('rootPage'),
        }
    }
    render() {
        return (
            <Container>
                {this.state.rootPage == 'settings' ?
                    <View style={{
                        flexDirection: 'row',
                        alignItems:'center',}}>
                        <TouchableOpacity
                            style={{ padding: 20 }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Icon name="angle-left" size={30} color="#fd3c65" />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 20, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                            Edit profile
                    </Text>
                    </View>
                    : null}
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {this.props.userInfo.profileImage ?
                                <TouchableOpacity
                                    style={{ alignItems: 'center' }}
                                    onPress={() => this.props.onUserInfoChange('profile_image_change', null)}>
                                    <Image
                                        style={{
                                            height: 100,
                                            width: 100,
                                            borderRadius: 100 / 2,
                                        }}
                                        source={{ uri: `data:image/png;base64,${this.props.userInfo.profileImage}` }}
                                    />
                                    <Text style={{ fontSize: 17, marginTop: 5, color: '#2699fb', fontFamily: 'Raleway-Regular' }}>Remove profile</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={{ alignItems: 'center' }}
                                    onPress={() => this.addProfileImage()}>
                                    <Image
                                        style={{
                                            height: 100,
                                            width: 100,
                                            borderRadius: 100 / 2,
                                        }}
                                        source={require('../assets/img/logo.png')} />
                                    <Text style={{ fontSize: 17, marginTop: 5, color: '#2699fb', fontFamily: 'Raleway-Regular' }}>Chnage photo</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Raleway-BoldItalic' }}>{this.props.userInfo.phone_number}</Text>
                        </View>
                        <Form>
                            <Item stackedLabel style={{ marginLeft: 0 }}>
                                <Label style={{ color: '#9199a1', fontFamily: 'Raleway-Regular' }}>Name</Label>
                                <Input
                                    style={{ fontSize: 15, padding: 0, height: 10, fontFamily: 'Raleway-Regular', lineHeight: 15, color: '#242729' }}
                                    onChangeText={(value) => this.props.onUserInfoChange('name_change', value)
                                    }
                                    value={this.props.userInfo.name} />
                            </Item>
                            <Item stackedLabel style={{ marginLeft: 0 }}>
                                <Label style={{ color: '#9199a1', fontFamily: 'Raleway-Regular' }}>Email id</Label>
                                <Input
                                    keyboardType="email-address"
                                    onChangeText={(value) => this.props.onUserInfoChange('email_id', value)
                                    }
                                    style={{ fontSize: 15, padding: 0, height: 10, lineHeight: 15, color: '#242729', fontFamily: 'Raleway-Regular' }}
                                    value={this.props.userInfo.email_id} />
                            </Item>

                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }}>
                                <Item style={{ width: '50%', marginLeft: 0 }}>
                                    <TouchableOpacity style={{ width: '100%' }} onPress={() => this.showDropDownModalVisible(0)}>
                                        <Label style={{ fontSize: 15, color: '#9199a1', marginTop: 8, marginBottom: 4, fontFamily: 'Raleway-Regular' }}>Location</Label>
                                        <Text style={{ fontSize: 15, paddingLeft: 0, marginBottom: 10, color: '#242729', fontFamily: 'Raleway-Regular' }}>
                                            {this.props.userInfo.location}
                                        </Text>
                                    </TouchableOpacity>
                                </Item>
                                <Item style={{ width: '50%', marginLeft: 0, }}>
                                    <TouchableOpacity style={{ width: '100%' }} onPress={() => this.showDropDownModalVisible(2)}>
                                        <Label style={{ fontSize: 15, color: '#9199a1', marginTop: 8, marginBottom: 4, fontFamily: 'Raleway-Regular' }}>Gender</Label>
                                        <Text style={{ fontSize: 15, paddingLeft: 0, marginBottom: 10, color: '#242729', fontFamily: 'Raleway-Regular' }}>
                                            {this.props.userInfo.gender}
                                        </Text>
                                    </TouchableOpacity>
                                </Item>
                            </View>

                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }}>
                                <Item style={{ width: '50%', marginLeft: 0, }}>
                                    <TouchableOpacity onPress={() => this.dataPicker()}>
                                        <Label style={{ fontSize: 15, color: '#9199a1', marginTop: 8, marginBottom: 4, fontFamily: 'Raleway-Regular' }}>Date of birth</Label>
                                        <Text style={{ fontSize: 15, paddingLeft: 0, marginBottom: 10, color: '#242729', fontFamily: 'Raleway-Regular' }}>
                                            {this.props.userInfo.DOB ? moment(this.props.userInfo.DOB).format("ll") : ''}
                                        </Text>
                                    </TouchableOpacity>
                                </Item>
                                <Item style={{ width: '50%', marginLeft: 0, }}>
                                    <TouchableOpacity onPress={() => this.showDropDownModalVisible(1)}>
                                        <Label style={{ fontSize: 15, color: '#9199a1', marginTop: 8, marginBottom: 4, fontFamily: 'Raleway-Regular' }}>Blood group</Label>
                                        <Text style={{ fontSize: 15, paddingLeft: 0, marginBottom: 10, color: '#242729', fontFamily: 'Raleway-Regular' }}>
                                            {this.props.userInfo.blood_group}
                                        </Text>
                                    </TouchableOpacity>
                                </Item>
                            </View>

                            <ListItem style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text style={{ fontSize: 15, color: '#9199a1', fontFamily: 'Raleway-Regular' }}>Want to be a volunteer?</Text>
                                </Body>
                                <Right style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Switch
                                        thumbColor={this.props.userInfo.isVolunteer ? "#fd3c65" : "#9199a1"}
                                        onValueChange={(value) => { this.props.onUserInfoChange('is_volunteer', value) }}
                                        value={this.props.userInfo.isVolunteer} />
                                    <TouchableOpacity>
                                        <Icon name="info-circle" size={20} color="#9199a1" />
                                    </TouchableOpacity>
                                </Right>
                            </ListItem>

                            <Button block rounded
                                onPress={() => this.submit()}
                                style={{
                                    marginTop: 40,
                                    padding: 25,
                                    fontFamily: 'Raleway-Regular',
                                    backgroundColor: '#fd3c65'
                                }}>
                                <Text style={{ fontSize: 17, color: '#fff' }}>Submit</Text>
                            </Button>
                        </Form>


                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.dropDownModalVisible}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ padding: 20 }}
                                        onPress={() => {
                                            this.setState({ dropDownModalVisible: !this.state.dropDownModalVisible });
                                        }}>
                                        <Icon name="angle-left" size={30} color="#fd3c65" />
                                    </TouchableOpacity>

                                    <Text style={{ fontSize: 20, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                                        {this.state.filterType == 1 ? 'Select blood group' : this.state.filterType == 2 ? 'Gender' : 'Select your location'}
                                    </Text>
                                </View>
                                <View>
                                    {this.state.filterType == 1 ?
                                        <BloodGroupList onSelectBloodGroup={this.onModalChange} />
                                        : this.state.filterType == 2 ?
                                            <GenderList onSelectGender={this.onModalChange} />
                                            : this.state.filterType == 0 ?
                                                <LocationList onSelectLocation={this.onModalChange} />
                                                : null
                                    }
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    onModalChange = (flag, type) => {
        this.props.onUserInfoChange(flag, type)
        this.setState({ dropDownModalVisible: false });
    }

    submit = async () => {
        if (this.props.userInfo.name.length < 1) {
            ToastAndroid.show('Please enter your name', ToastAndroid.SHORT);
        } else if (!emailRegex.test(this.props.userInfo.email_id)) {
            ToastAndroid.show('Invalid email id', ToastAndroid.SHORT);
        } else if (this.props.userInfo.location.length < 1) {
            ToastAndroid.show('Please enter your location', ToastAndroid.SHORT);
        } else if (this.props.userInfo.gender.length < 1) {
            ToastAndroid.show('Please enter your gender', ToastAndroid.SHORT);
        } else if (this.props.userInfo.DOB.length < 1) {
            ToastAndroid.show('Please enter your date of birth', ToastAndroid.SHORT);
        } else if (this.props.userInfo.blood_group.length < 1) {
            ToastAndroid.show('Please enter your blood group', ToastAndroid.SHORT);
        } else {
            console.log('submit success');
            console.log(this.props.userInfo);
            createUser(this.props.userInfo).then(res => {
                console.log('createUser response');
                console.log(res);
                if(this.state.rootPage == 'settings'){
                    this.props.navigation.goBack();
                } else {
                    this.props.navigation.navigate('App');
                }
            })
        }
    }

    selectedItemFromModal(flag, type) {
        this.props.onUserInfoChange(flag, type);
        this.setState({ dropDownModalVisible: false });
    }

    componentWillMount() {
    }

    addProfileImage() {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        })
            .then(image => {
                this.props.onUserInfoChange('profile_image_change', image.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    showDropDownModalVisible(filterType) {
        console.log(filterType);
        this.setState({ filterType: filterType })
        this.setState({ dropDownModalVisible: true });
    }

    async dataPicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.props.userInfo.DOB
                    ?
                    new Date(this.props.userInfo.DOB[0], this.props.userInfo.DOB[1] - 1, this.props.userInfo.DOB[2])
                    :
                    new Date(),
                //   minDate: 
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                let value = [year, month + 1, day];
                this.props.onUserInfoChange('DOB', value)
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
