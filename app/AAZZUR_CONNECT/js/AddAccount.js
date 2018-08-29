import React, { Component } from 'react';
import {
    Animated,
    Keyboard,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
import colors from './colors';
import AppBar from './AppBar';
import { scaleHeight, scaleFont, scaleWidth } from './scale';
import remote from './remote';

export default class AddAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLogo: new Animated.Value(1)
        }
        this.keyboardDidHide = this.keyboardDidHide.bind(this);
        this.keyboardDidShow = this.keyboardDidShow.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide);

        this.mounted = false;
    }

    keyboardDidShow() {
        this.mounted && Animated.timing(this.state.showLogo, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
        }).start();
    }

    keyboardDidHide() {
        this.mounted && Animated.timing(this.state.showLogo, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start();
    }

    render() {
        let iosElevationStyle =  {
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 1
            },
            shadowRadius: 0,
            shadowOpacity: 0.5};
        return (
            <View style = {{backgroundColor: 'white', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <AppBar text = 'Add Account' />
                <Animated.Image source = {require('../assets/aazzur_connect_logo.png')} style = {{position: 'absolute', height: scaleHeight(192), width: scaleWidth(192), top: (Platform.OS === 'ios' ? 22 : 0) + scaleHeight(56), alignSelf: 'center', opacity: this.state.showLogo, transform: [{scale: this.state.showLogo}]}}
                resizeMode = 'contain' />
                <Text style = {{fontSize: scaleFont(18), fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : 'Helvetica', marginBottom: scaleHeight(16), color: 'black'}}>Enter Bank details</Text>
                <TextInput placeholder = 'IBAN' style = {{width: '80%', height: scaleHeight(40), borderColor: 'black', borderWidth: 0.5}} editable = {false} />
                {/* <TextInput placeholder = 'Username' 
                style = {{width: '80%', height: scaleHeight(40), marginTop: scaleHeight(10), borderColor: 'black', borderWidth: 0.5}} 
                onChangeText = {(userName) => this.setState({userName})}/> */}
                <TextInput placeholder = 'BIC' style = {{width: '80%', height: scaleHeight(40), marginTop: scaleHeight(10), borderColor: 'black', borderWidth: 0.5}} editable = {false} />
                <TouchableOpacity disabled = {!this.state.userName}
                onPress = {() => {
                    remote.setUserName(this.state.userName);
                    this.props.navigation.navigate('Spendings');
                    }} style = {[{position: 'absolute', bottom: scaleHeight(16), width: '80%', height: scaleHeight(30), marginTop: scaleHeight(10), backgroundColor: !this.state.userName ? '#D8D8D8FF' : colors.blue, elevation: 2, justifyContent: 'center'}, Platform.OS === 'ios' ? iosElevationStyle : {}]}>
                    <Text style = {{width: '100%', height: '100%', fontSize: scaleFont(16), textAlign: 'center', textAlignVertical: 'center', color: !this.state.userName ? 'black' : 'white'}}>Proceed</Text>
                </TouchableOpacity>
            </View>
        );
    }
}