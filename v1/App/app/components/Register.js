import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    DatePickerAndroid,
    AsyncStorage,
    FlatList,
    Modal,
    ScrollView
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
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';

import {getLocationList} from '../dataService';

import * as firebase from 'firebase';
import 'firebase/firestore';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            bloodGroup: [{type:"A+"},{type: "O+"},{type: "B+"},{type: "AB+"},{type: "B"},{type: "A-"},{type: "O-"},{type: "B-"},{type: "AB-"}],
            dropDownModalVisible: false,
            filterType: null,
            location_list: null,
        }
    }
  render() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{marginTop:10,flexDirection:'row',justifyContent:'center'}}>
                    
                    {this.props.userInfo.profileImage?
                    <TouchableOpacity
                        style={{alignItems: 'center'}}
                        onPress={()=>this.props.onUserInfoChange('profile_image_change', null)}>
                        <Image
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 100/2,
                            }}
                            source={{uri: `data:${this.props.userInfo.profileImage.mime};base64,${this.props.userInfo.profileImage.data}`}}
                        />
                        <Text style={{fontSize:17,marginTop:5,color:'#2699fb',fontFamily:'Raleway-Regular'}}>Remove profile</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{alignItems: 'center'}}
                        onPress={()=>this.addProfileImage()}>
                    <Image
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100/2,
                        }}
                        source={require('../assets/img/logo.png')} />
                        <Text style={{fontSize:17,marginTop:5,color:'#2699fb',fontFamily:'Raleway-Regular'}}>Chnage photo</Text>
                    </TouchableOpacity>
                    }
                </View>
                <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
                <Text style={{fontSize:17,fontFamily:'Raleway-BoldItalic'}}>{this.props.userInfo.phone_number}</Text>
                </View>
                <Form>
                    <Item stackedLabel style={{marginLeft:0}}>
                        <Label style={{color:'#9199a1',fontFamily:'Raleway-Regular'}}>Name</Label>
                        <Input
                            style={{fontSize:15,padding:0,height:10,fontFamily:'Raleway-Regular',lineHeight:15,color:'#242729'}}
                            onChangeText={(value) => this.props.onUserInfoChange('name_change', value)
                            }
                            value={this.props.userInfo.name} />
                    </Item>
                    <Item stackedLabel style={{marginLeft:0}}>
                        <Label style={{color:'#9199a1',fontFamily:'Raleway-Regular'}}>Email id</Label>
                        <Input
                            keyboardType="email-address"
                            onChangeText={(value) => this.props.onUserInfoChange('email_id', value)
                            }
                            style={{fontSize:15,padding:0,height:10,lineHeight:15,color:'#242729',fontFamily:'Raleway-Regular'}}
                            value={this.props.userInfo.email_id} />
                    </Item>
                    
                    <View style={{flexDirection: 'row',width:'100%',justifyContent:'flex-start'}}>
                    <Item style={{width: '50%',marginLeft:0}}>
                    <TouchableOpacity style={{width:'100%'}} onPress={()=>this.showDropDownModalVisible(0)}>
                        <Label style={{fontSize:15,color:'#9199a1',marginTop:8,marginBottom:4,fontFamily:'Raleway-Regular'}}>Location</Label>
                        <Text style={{fontSize:15,paddingLeft:0,marginBottom:10,color:'#242729',fontFamily:'Raleway-Regular'}}>
                            {this.props.userInfo.location}
                        </Text>
                    </TouchableOpacity>
                    </Item>
                    <Item style={{width: '50%',marginLeft:0,}}>
                    <TouchableOpacity style={{width:'100%'}} onPress={()=>this.showDropDownModalVisible(2)}>
                        <Label style={{fontSize:15,color:'#9199a1',marginTop:8,marginBottom:4,fontFamily:'Raleway-Regular'}}>Gender</Label>
                        <Text style={{fontSize:15,paddingLeft:0,marginBottom:10,color:'#242729',fontFamily:'Raleway-Regular'}}>
                            {this.props.userInfo.gender}
                        </Text>
                    </TouchableOpacity>
                    </Item>
                    </View>

                    <View style={{flexDirection: 'row',width:'100%',justifyContent:'flex-start'}}>
                    <Item style={{width: '50%',marginLeft:0,}}>
                    <TouchableOpacity onPress={()=>this.dataPicker()}>
                        <Label style={{fontSize:15,color:'#9199a1',marginTop:8,marginBottom:4,fontFamily:'Raleway-Regular'}}>Date of birth</Label>
                        <Text style={{fontSize:15,paddingLeft:0,marginBottom:10,color:'#242729',fontFamily:'Raleway-Regular'}}>
                            {this.props.userInfo.DOB?this.props.userInfo.DOB[2] + '/':null}
                            {this.props.userInfo.DOB?this.props.userInfo.DOB[1] + '/':null}
                            {this.props.userInfo.DOB?this.props.userInfo.DOB[0]:null}
                        </Text>
                    </TouchableOpacity>
                    </Item>
                    <Item style={{width: '50%',marginLeft:0,}}>
                    <TouchableOpacity onPress={()=>this.showDropDownModalVisible(1)}>
                        <Label style={{fontSize:15,color:'#9199a1',marginTop:8,marginBottom:4,fontFamily:'Raleway-Regular'}}>Blood group</Label>
                        <Text style={{fontSize:15,paddingLeft:0,marginBottom:10,color:'#242729',fontFamily:'Raleway-Regular'}}>
                            {this.props.userInfo.blood_group}
                        </Text>
                    </TouchableOpacity>
                    </Item>
                    </View>

                    <ListItem style={{marginLeft:0}}>
                        <Body>
                        <Text style={{fontSize:15,color:'#9199a1',fontFamily:'Raleway-Regular'}}>Want to be a volunteer?</Text>
                        </Body>
                        <Right style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Switch
                            thumbColor={this.props.userInfo.isVolunteer?"#fd3c65":"#9199a1"}
                            onValueChange={(value)=>{this.props.onUserInfoChange('is_volunteer', value)}}
                            value={this.props.userInfo.isVolunteer} />
                        <TouchableOpacity>
                            <Icon name="info-circle" size={20} color="#9199a1" />
                        </TouchableOpacity>
                        </Right>
                    </ListItem>

                    <Button block rounded
                        disabled = {
                            !this.props.userInfo.blood_group &&
                            !this.props.userInfo.email_id &&
                            !this.props.userInfo.location &&
                            !this.props.userInfo.gender &&
                            !this.props.userInfo.DOB &&
                            // !this.props.userInfo.phone_number &&
                            !this.props.userInfo.name
                        }
                        onPress={()=>this.submit()}
                        style={{
                            marginTop:30,
                            padding:25,
                            fontFamily:'Raleway-Regular',
                            backgroundColor:
                                this.props.userInfo.blood_group &&
                                this.props.userInfo.email_id &&
                                this.props.userInfo.location &&
                                this.props.userInfo.gender &&
                                this.props.userInfo.DOB &&
                                // this.props.userInfo.phone_number &&
                                this.props.userInfo.name
                                ?'#fd3c65':'#fd3c657d'
                        }}>
                        <Text style={{fontSize:17,color:'#fff'}}>Submit</Text>
                    </Button>
                </Form>
                

                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.dropDownModalVisible}>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity style={{padding:20}}
                                onPress={() => {
                                this.setState({dropDownModalVisible: !this.state.dropDownModalVisible});
                                }}>
                                <Icon name="angle-left" size={30} color="#2699fb" />
                            </TouchableOpacity>
                            
                            <Text style={{fontSize: 20,fontFamily:'Raleway-Regular',color:'#242729'}}>
                                {this.state.filterType==1?'Select blood group':this.state.filterType==2?'Gender':'Select your location'}
                            </Text>
                        </View>
                        <View>
                            {this.state.filterType==1?
                            <FlatList
                                data={this.state.bloodGroup}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns = {3}
                                columnWrapperStyle={{marginTop:20,paddingHorizontal: 20,flexDirection:'row',justifyContent:'space-between'}}
                                renderItem={({item, index}) => 
                                <TouchableOpacity onPress={()=>this.selectedItemFromModal('blood_group', item.type)} style={styles.modal_b_type_btn}>
                                    <Text style={styles.modal_b_type_title}>{item.type}</Text>
                                </TouchableOpacity>
                                }
                            />:this.state.filterType==2?
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
                            :
                            <FlatList
                                style={{height: 500}}
                                data={this.state.location_list}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) =>
                                <List>
                                    <Text style={{color:'red'}}>{item.name}</Text>
                                    <FlatList
                                        data={item.district_list}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item, index}) =>
                                            <View>                                                                                
                                                <ListItem itemDivider>
                                                <Text>{item.name}</Text>
                                                </ListItem>
                                                <FlatList
                                                    style={{paddingHorizontal: 20}}
                                                    data={item.taluk_list}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({item, index}) =>
                                                        <TouchableOpacity onPress={()=>this.selectedItemFromModal('selected_location', item.name)}>
                                                        <Text>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    }
                                                />
                                            </View>
                                        }
                                    />
                                </List>
                                }
                            />
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
  }

    submit(){
        // console.log(this.props.userInfo);
        firebase.firestore().collection("users").add(this.props.userInfo)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    selectedItemFromModal(flag, type){
        this.props.onUserInfoChange(flag, type);
        this.setState({dropDownModalVisible: false});
    }

    componentWillMount(){
        getLocationList().then(res=>{
            this.setState({location_list: res.state_list});
            console.log(this.state.location_list);
        })
        .catch((err) => {
            console.log(err);
        })
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

    showDropDownModalVisible(filterType){
        console.log(filterType);
        this.setState({filterType:filterType})
        this.setState({dropDownModalVisible:true});
    }

    async dataPicker(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: this.props.userInfo.DOB
                        ?
                        new Date(this.props.userInfo.DOB[0], this.props.userInfo.DOB[1]-1, this.props.userInfo.DOB[2])
                        :
                        new Date(),
            //   minDate: 
              maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
              let value = [year, month+1, day];
              this.props.onUserInfoChange('DOB', value)
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
