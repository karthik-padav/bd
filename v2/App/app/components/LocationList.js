import React, { Component } from 'react';
import {
    Text,
    SectionList,
} from 'react-native';
import {
    ListItem,
    List,
} from 'native-base';

class LocationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location_list: [
                {District: 'Dakshina Kannada', data: ['Mangalore', 'Bantval', 'Puttur', 'Beltangadi', 'Sulya']},
                {District: 'Udupi', data: ['Udupi', 'Kundapura', 'Karkal']},
            ]
        }
    }
    render() {
        return (
            <SectionList
                renderItem={({ item, index, section }) => (
                    <List>
                        <ListItem onPress={() => this.selectedItemFromModal('selected_location', item)}>
                            <Text key={index}>{item}</Text>
                        </ListItem>
                    </List>
                )}
                renderSectionHeader={({ section: { District } }) => (
                    <List>
                        <ListItem itemDivider>
                            <Text style={{ fontWeight: 'bold' }}>{District}</Text>
                        </ListItem>
                    </List>
                )}
                sections={this.state.location_list}
                keyExtractor={(item, index) => item + index}
            />
        );
    }

    selectedItemFromModal(flag, type){
        this.props.onSelectLocation(flag, type);
    }
}

export default LocationList