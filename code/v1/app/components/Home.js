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
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import {
    Button,
    Icon,
} from 'native-base';

import {getAllUser} from '../dataService';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            bloodGroup: [{ type: "A+"},{ type: "O+"},{ type: "B+"},{ type: "AB+"},{ type: "B"},
                { type: "A-"},
                { type: "O-"},
                { type: "B-"},
                { type: "AB-"},
              ]
        }
    }
  render() {
    return (
            <View style={styles.container}>
                <View style={{marginBottom: 45,marginTop: 25}}>
                    <Text style={{fontSize: 35,lineHeight:37,fontFamily: 'Raleway-BoldItalic', color: '#242424'}}>Lets help to</Text>
                    <Text style={{fontSize: 35,lineHeight:37,fontFamily: 'Raleway-BoldItalic', color: '#242424'}}>save a life</Text>
                </View>
                
                <FlatList
                    data={this.state.bloodGroup}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns = {3}
                    columnWrapperStyle={{flexDirection:'row',justifyContent:'space-between'}}
                    renderItem={({item, index}) => 
                    <TouchableOpacity onPress={()=>this.bloodGroupSelected(item.type)} style={styles.b_type_btn}>
                        <Text style={styles.b_type_title}>{item.type}</Text>
                    </TouchableOpacity>
                    }
                />
            </View>
    );
  }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(this.props.userInfo);
    }

    bloodGroupSelected(type){
        getAllUser(firebase.firestore()).then(res=>{
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    b_type_btn: {
        width: 80,
        height: 80,
        borderRadius: 80/2,
        // backgroundColor: '#fd3c65',
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
        fontFamily: 'Raleway-Regular'
    }
});
