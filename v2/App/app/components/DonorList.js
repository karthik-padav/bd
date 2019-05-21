import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SectionList,
    StyleSheet
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
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class DonorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <View>
                <List>
                    <ListItem avatar>
                        <Left>
                            <Text style={styles.b_type_title}>O+</Text>
                        </Left>
                        <Body>
                            <Text style={{fontFamily:'Raleway-Bold'}}>
                                Kumar Pratik
                            </Text>
                            <Text style={{fontFamily:'Raleway-Regular'}} note>
                                State: Karnataka
                            </Text>
                            <Text style={{fontFamily:'Raleway-Regular'}} note>
                                Location: Mangalore
                            </Text>
                        </Body>
                        <Right style={{justifyContent:'center'}}>
                            <TouchableOpacity style={{paddingHorizontal:20}}
                                onPress={()=>this.props.navigation.navigate('UserProfile', { rootPage: 'userList'})}>
                            <Icon name="angle-right" size={30} color="#fd3c65" />
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                </List>
            </View>
        );
    }

    componentDidMount(){
        console.log('this.props.selectedLocation');
    }
}

export default DonorList


const styles = StyleSheet.create({
    b_type_title: {
        color: '#fd3c65',
        fontSize: 35,
        fontFamily:'Raleway-Regular'
    }
});