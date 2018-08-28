import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import colors from './colors';


export default class Login extends Component {

    render() {
        return (
            <View style = {{backgroundColor: 'white', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                
                <TextInput placeholder = 'Username' style = {{width: '80%', height: 40, textAlignVertical: 'center', borderColor: 'black', borderWidth: 0.5}} />
                <TextInput placeholder = 'Password' style = {{width: '80%', height: 40, marginTop: 10, borderColor: 'black', borderWidth: 0.5}} />
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('MainScreen')} style = {{position: 'absolute', bottom: 16, width: '80%', height: 30, marginTop: 10, backgroundColor: colors.blue, elevation: 2, justifyContent: 'center'}}>
                    <Text style = {{width: '100%', height: '100%', fontSize: 16, textAlign: 'center', textAlignVertical: 'center', color: 'white'}}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}