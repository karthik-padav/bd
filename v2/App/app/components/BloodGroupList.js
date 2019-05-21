import React, { Component } from 'react';
import {
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class BloodGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bloodGroup: [{type:"A+"},{type: "O+"},{type: "B+"},{type: "AB+"},{type: "B"},{type: "A-"},{type: "O-"},{type: "B-"},{type: "AB-"}],
        }
    }
    render() {
        return (
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
            />
        );
    }

    selectedItemFromModal(flag, type){
        this.props.onSelectBloodGroup(flag, type);
    }
}

export default BloodGroupList

const styles = StyleSheet.create({
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