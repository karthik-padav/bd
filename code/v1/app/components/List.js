import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    View,
    Linking,
    Modal,
} from 'react-native';
// import RNAccountKit from 'react-native-facebook-account-kit';
import {
    Button,
    Item,
    Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            donorList: [
                { type: "A+",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "O+",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "B+",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "AB+",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "B",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "A-",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "O-",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "B-",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
                { type: "AB-",name:"karthik",contact_number:'+919901373620',state:"karnataka",district:"Mangalore"},
              ],
            bloodGroup: [{type:"A+"},{type: "O+"},{type: "B+"},{type: "AB+"},{type: "B"},{type: "A-"},{type: "O-"},{type: "B-"},{type: "AB-"}],
            filterModalVisible: false,
            selectedBloodType:'A+',
            filterType: null,
        }
    }
  render() {
    return (
        <View style={styles.container}>
            <View style={{marginHorizontal:15,flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>this.showFilter(0)} style={{flexDirection:'row',paddingVertical:20, alignItems:'center'}}>
                    <Icon name="map-marker" size={25} color="#2699fb" />
                    <Text style={{fontFamily:'Raleway-BoldItalic',fontSize:17, paddingLeft:10}}>Location...</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.showFilter(1)} style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon name="tint" size={25} color="#2699fb" />
                    <Text style={{fontFamily:'Raleway-BoldItalic',fontSize:17, paddingLeft:10}}>
                        {this.state.selectedBloodType}
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={this.state.donorList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                    <View style={{backgroundColor:'#e7ecee',borderRadius:5,padding:10,marginHorizontal:10,marginBottom:7, flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={styles.b_type_btn}>
                                <Text style={styles.b_type_title}>{item.type}</Text>
                            </View>
                            <View style={{paddingLeft:10}}>
                                <Text style={{fontFamily: 'Raleway-BoldItalic'}}>{item.name}</Text>
                                <Text style={{fontFamily: 'Raleway-Regular'}}>{item.state}, {item.district}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity
                                onPress={()=> this.smsNumber(item.contact_number)}
                                style={{padding:10}}>
                                <Icon name="envelope" size={20} color="#2699fb" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> this.callNumber(`tel:${item.contact_number}`)}
                                style={{padding:10}}>
                                <Icon name="phone" size={20} color="#2699fb" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                />
            </View>

            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.filterModalVisible}>
                <View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity style={{padding:20}}
                            onPress={() => {
                            this.setState({filterModalVisible: !this.state.filterModalVisible});
                            }}>
                            <Icon name="angle-left" size={30} color="#2699fb" />
                        </TouchableOpacity>
                        
                        <Text style={{fontSize: 20,fontFamily:'Raleway-Regular',color:'#242424'}}>
                            {this.state.filterType==1?'Select blood group':'Select your location'}
                        </Text>
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                        {this.state.filterType==1?
                        <FlatList
                            data={this.state.bloodGroup}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns = {3}
                            columnWrapperStyle={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}
                            renderItem={({item, index}) => 
                            <TouchableOpacity onPress={()=>this.selectedBloodTypeFilter(item.type)} style={styles.modal_b_type_btn}>
                                <Text style={styles.modal_b_type_title}>{item.type}</Text>
                            </TouchableOpacity>
                            }
                        />:
                        <Text>asdasd</Text>
                        }
                    </View>
                </View>
            </Modal>
        </View>
    );
  }

    componentDidMount() {
        
    }

    showFilter(filterType){
        console.log(filterType);
        this.setState({filterType:filterType})
        this.setState({filterModalVisible:true});
    }

    selectedBloodTypeFilter(type){
        this.setState({selectedBloodType: type}, ()=>{
            this.setState({filterModalVisible:false});
        })
    }

    callNumber = (url) =>{
        Linking.canOpenURL(url).then(supported => {
        if (!supported) {
         console.log('Can\'t handle url: ' + url);
        } else {
         return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }

    smsNumber=(number)=>{
        console.log(number);
        Linking.canOpenURL('whatsapp://send?text=hello&phone='+number).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ');
        } else {
            Linking.openURL('whatsapp://send?text=hello&phone='+number);
        }
        }).catch(err => console.error('An error occurred', err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
    },
    b_type_btn: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: '#fd3c65',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderWidth: 1,
        borderColor: '#fd3c65',
    },
    b_type_title: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Raleway-Regular'
    },
    modal_b_type_btn: {
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
    modal_b_type_title: {
        color: '#fd3c65',
        fontSize: 17,
        fontFamily: 'Raleway-Regular'
    }
});
