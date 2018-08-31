import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar
} from 'react-native';
import { scaleFont, scaleWidth, scaleHeight } from './scale';

export default class AppBar extends Component {
    render () {
       let iosElevationStyle =  {top: 20,
                                shadowColor: '#000000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowRadius: 0,
                                shadowOpacity: 0.5,
                                alignItems: 'center',
                            flexDirection: 'row'};
        return(
        <View style = {[{position: 'absolute', backgroundColor: 'white', elevation: 4, width: '100%', height: scaleHeight(56), top: 0 }, Platform.OS === 'ios' ? iosElevationStyle : {}]}>
            <Text style = {{height: Platform.OS === 'android' ? '100%' : undefined, fontSize: scaleFont(16), fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : 'Helvetica', marginLeft: scaleWidth(16), textAlignVertical: 'center', color: 'black'}}>{this.props.text}</Text>
        </View>
        );
    }
}