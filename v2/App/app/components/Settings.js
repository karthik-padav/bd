import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    Modal
} from 'react-native';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Button,
    Right,
    Switch
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import DonorList from './DonorList';
import LocationList from './LocationList';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLocationListVisible: false,
            selectedLocation: '',
        }
    }
    render() {
        return (
            <Container>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ padding: 20 }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Icon name="angle-left" size={30} color="#fd3c65" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                        Settings
                    </Text>
                </View>
                <ListItem icon>
                    <Body>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('UserProfile', { rootPage: 'settings' })
                            }}>
                            <Text style={{ fontSize: 17, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                                Profile
                        </Text>
                        </TouchableOpacity>
                    </Body>
                    <Right>
                        <Icon name="user" size={20} color="#242729" />
                    </Right>
                </ListItem>

                <ListItem>
                    <Body>
                        <Text style={{ fontSize: 17, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                            About
                        </Text>
                    </Body>
                </ListItem>

                <ListItem>
                    <Body>
                        <TouchableOpacity
                            onPress={() => {this.confirmLogout()}}>
                            <Text style={{ fontSize: 17, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </Body>
                </ListItem>
            </Container>
        );
    }

    onModalChange = (flag, type) => {
        this.setState({ isLocationListVisible: false });
        this.setState({ selectedLocation: type });
    }

    logout = async () => {
        await AsyncStorage.removeItem('phone_number');
        this.props.navigation.navigate('Auth');
    }

    confirmLogout(){
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.logout()},
            ],
            {cancelable: false},
          );
    }
}

export default Settings


const styles = StyleSheet.create({
    b_type_title: {
        color: '#fd3c65',
        fontSize: 35,
        lineHeight: 35,
        fontFamily: 'Raleway-Regular'
    }
});