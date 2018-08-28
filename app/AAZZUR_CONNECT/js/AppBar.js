import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { scaleFont, scaleWidth, scaleHeight } from './scale';

export default class AppBar extends Component {
    render () {
        return(
        <View style = {{position: 'absolute', backgroundColor: 'white', elevation: 4, width: '100%', height: scaleHeight(56), top: 0}}>
            <Text style = {{height: '100%', fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', marginLeft: scaleWidth(16), textAlignVertical: 'center', color: 'black'}}>{this.props.text}</Text>
        </View>
        );
    }
}