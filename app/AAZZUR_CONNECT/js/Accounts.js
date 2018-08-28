import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import AppBar from './AppBar';
import { scaleHeight, scaleWidth, scaleFont } from './scale';
import colors from './colors';

export default class Accounts extends Component {

    render() {
        let accountData = [{
            accountName: 'Deutsche Bank',
            accountIcon: require('../assets/DB.png'),
            iban: 'DE76100710075436756300'
        },
        {
            accountName: 'DKB',
            accountIcon: require('../assets/DKB.png'),
            iban: 'DE89143890764215764554'
        },
        {
            accountName: 'N26',
            accountIcon: require('../assets/n26.png'),
            iban: 'DE12548709896545652176'
        },
        {
            accountName: 'Sparkasse',
            accountIcon: require('../assets/SB.png'),
            iban: 'DE76076551236579085665'
        }];

        return (
            <View style = {{width: '100%', height: '100%', backgroundColor: 'white', alignItems: 'center'}}>
                <AppBar text = 'Accounts' />
                <View style = {{marginTop: 56, flex: 1, width: '100%'}}>
                    <FlatList style = {{flex: 1, width: '100%'}} 
                    data = {accountData}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem = {({item}) => {
                        return (
                            <View style = {{backgroundColor: 'white', width: '100%', height: scaleHeight(72), borderColor: '#0000000D', borderBottomWidth: 1, elevation: 2}}>
                                <View style = {{backgroundColor: 'white', width: '100%', height: scaleHeight(48), paddingHorizontal: scaleWidth(16), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style = {{fontSize: 16, fontFamily: 'sans-serif-condensed', textAlignVertical: 'center', color: 'black', opacity: 0.7}}>{item.accountName}</Text>
                                    <Image style = {{height: 24, width: 24}} source = {item.accountIcon} resizeMode = 'contain' />
                                </View>
                                <Text style = {{fontSize: 12, fontFamily: 'sans-serif-condensed', textAlignVertical: 'top', opacity: 0.45, color: 'black', paddingLeft:scaleWidth(16)}}>{'IBAN: ' + item.iban}</Text>
                            </View>
                        )
                    }}/>
                </View>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('AddAccount')} style = {{position: 'absolute', bottom: scaleHeight(16), width: scaleHeight(50), height: scaleHeight(50), borderRadius: scaleHeight(25), marginTop: scaleHeight(10), backgroundColor: colors.blue, elevation: 8, borderWidth: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style = {{width: scaleHeight(40), height: scaleHeight(40), }} source = {require('../assets/add_white_24dp.png')} />
                </TouchableOpacity>
            </View>
        );
    }

}
