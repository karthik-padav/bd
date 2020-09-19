import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

class GenderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity
                    onPress={()=>this.selectedItemFromModal('gender', 'Male')}
                    style={{marginTop:20,alignItems:'center'}}>
                    <Image
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100/2,
                        }}
                        source={require('../assets/img/male.png')}
                    />
                    <Text style={{marginTop:10,fontFamily:'Raleway-Regular',color:'#242729'}}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.selectedItemFromModal('gender', 'Female')}
                    style={{marginTop:20,alignItems:'center'}}>
                    <Image
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100/2,
                        }}
                        source={require('../assets/img/female.png')}
                    />
                    <Text style={{marginTop:10,fontFamily:'Raleway-Regular',color:'#242729'}}>Female</Text>
                </TouchableOpacity>
            </View>
        );
    }

    selectedItemFromModal(flag, type){
        this.props.onSelectGender(flag, type);
    }
}

export default GenderList
