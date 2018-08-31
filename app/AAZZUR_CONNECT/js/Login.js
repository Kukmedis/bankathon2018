import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Animated,
    Platform
} from 'react-native';
import colors from './colors';
import { scaleHeight, scaleWidth } from './scale';
import remote from './remote';


export default class Login extends Component {

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
            <View 
            
            style = {{backgroundColor: 'white', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Animated.Image source = {require('../assets/aazzur_connect_logo.png')} style = {{position: 'absolute', height: scaleHeight(192), width: scaleWidth(192), top: scaleHeight(56), alignSelf: 'center', opacity: this.state.showLogo, transform: [{scale: this.state.showLogo}]}}
                resizeMode = 'contain' />
                <TextInput placeholder = 'Username' style = {{width: '80%', height: 40, textAlignVertical: 'center', borderColor: 'black', borderWidth: 0.5}} 
                 onChangeText = {(userName) => this.setState({userName})}
                 autoCapitalize = 'none'/>
                <TextInput placeholder = 'Password' style = {{width: '80%', height: 40, marginTop: 10, borderColor: 'black', borderWidth: 0.5}} autoCapitalize = 'none'/>
                <TouchableOpacity disabled = {!this.state.userName}
                onPress = {() => {
                    Keyboard.dismiss();
                    remote.setUserName(this.state.userName);
                    this.props.navigation.navigate('Spendings');
                }} style = {[{position: 'absolute', bottom: 16, width: '80%', height: 30, marginTop: 10, backgroundColor: !this.state.userName ? '#D8D8D8FF' : colors.blue, elevation: 2, justifyContent: 'center'}, Platform.OS === 'ios' ? iosElevationStyle : {}]}>
                    <Text style = {{width: '100%', height: '100%', fontSize: 16, textAlign: 'center', textAlignVertical: 'center', color: !this.state.userName ? 'black' : 'white'}}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}