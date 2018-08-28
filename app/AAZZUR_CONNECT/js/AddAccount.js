import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import colors from './colors';
import AppBar from './AppBar';
import { scaleHeight, scaleFont } from './scale';

export default class AddAccount extends Component {

    render() {
        return (
            <View style = {{backgroundColor: 'white', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <AppBar text = 'Add Account' />
                <TextInput placeholder = 'IBAN' style = {{width: '80%', height: scaleHeight(40), borderColor: 'black', borderWidth: 0.5}} />
                <TextInput placeholder = 'Username' style = {{width: '80%', height: scaleHeight(40), marginTop: scaleHeight(10), borderColor: 'black', borderWidth: 0.5}} />
                <TextInput placeholder = 'Password' style = {{width: '80%', height: scaleHeight(40), marginTop: scaleHeight(10), borderColor: 'black', borderWidth: 0.5}} />
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('SpendingInfo')} style = {{position: 'absolute', bottom: scaleHeight(16), width: '80%', height: scaleHeight(30), marginTop: scaleHeight(10), backgroundColor: colors.blue, elevation: 2, justifyContent: 'center'}}>
                    <Text style = {{width: '100%', height: '100%', fontSize: scaleFont(16), textAlign: 'center', textAlignVertical: 'center', color: 'white'}}>Add Account</Text>
                </TouchableOpacity>
            </View>
        );
    }
}