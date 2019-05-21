import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SectionList,
    StyleSheet,
    Modal
} from 'react-native';
import {
    ListItem,
    List,
    Left,
    Body,
    Tabs,
    Tab,
    Right,
    TabHeading,
    Header,
    Container,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import DonorList from './DonorList';
import LocationList from './LocationList';
import {filterUserList} from '../dataServices';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLocationListVisible: false,
            selectedLocation: '',
            userLists: null,
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

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({isLocationListVisible: true})
                        }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                            Change location
                        </Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Raleway-Regular', color: '#242729' }}>
                            {this.state.selectedLocation.length>0?this.state.selectedLocation:'All'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fd3c65' }}>
                    <Tab
                        textStyle={{color: '#fd3c65'}}
                        activeTextStyle={{color: '#fd3c65',fontFamily: 'Raleway-Regular'}}
                        tabStyle= { { backgroundColor: '#ffffff'}}
                        activeTabStyle={{ backgroundColor: "#ffffff" }}
                        heading="Donor">
                        <DonorList navigation={this.props.navigation} />
                    </Tab>
                    <Tab
                        textStyle={{color: '#fd3c65'}}
                        activeTextStyle={{color: '#fd3c65',fontFamily: 'Raleway-Regular'}}
                        tabStyle= { { backgroundColor: '#ffffff'}}
                        activeTabStyle={{ backgroundColor: "#ffffff" }}
                        heading="Receiver">
                        <DonorList />
                    </Tab>
                </Tabs>
                
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isLocationListVisible}>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity style={{padding:20}}
                                onPress={() => {
                                this.setState({isLocationListVisible: false});
                                }}>
                                <Icon name="angle-left" size={30} color="#fd3c65" />
                            </TouchableOpacity>
                            
                            <Text style={{fontSize: 20,fontFamily:'Raleway-Regular',color:'#242729'}}>
                                Select your location
                            </Text>
                        </View>
                        <LocationList onSelectLocation={this.onModalChange}/>
                    </View>
                </Modal>
            </Container>
        );
    }

    onModalChange = (flag, type) => {
        this.setState({selectedLocation: type},function(){
            this.setState({isLocationListVisible: false});
        });
    }

    getUserList(){
        filterUserList().then(res => {
            console.log(res);
            this.setState({userLists: res});
        })
    }

    componentWillMount(){
        filterUserList().then(res => {
            console.log(res);
            this.setState({userLists: res});
        })
    }
}

export default UserList


const styles = StyleSheet.create({
    b_type_title: {
        color: '#fd3c65',
        fontSize: 35,
        lineHeight: 35,
        fontFamily: 'Raleway-Regular'
    }
});