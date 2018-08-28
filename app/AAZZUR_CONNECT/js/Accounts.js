import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    Image
} from 'react-native';
import AppBar from './AppBar';

export default class Accounts extends Component {

    render() {
        let accountData = [{
            accountName: 'Deutsche Bank',
            accountIcon: require('../assets/DB.png')
        },
        {
            accountName: 'DKB',
            accountIcon: require('../assets/DKB.png')
        },
        {
            accountName: 'N26',
            accountIcon: require('../assets/n26.png')
        },
        {
            accountName: 'Sparkasse',
            accountIcon: require('../assets/SB.png')
        }];

        return (
            <View style = {{width: '100%', height: '100%', backgroundColor: 'white'}}>
                <AppBar text = 'Accounts' />
                <View style = {{marginTop: 56, flex: 1, width: '100%'}}>
                    <FlatList style = {{flex: 1, width: '100%'}} 
                    data = {accountData}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem = {({item}) => {
                        return (
                            <View style = {{backgroundColor: 'white', width: '100%', height: 48, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#0000000D', borderBottomWidth: 1, elevation: 2}}>
                                <Text style = {{fontSize: 16, fontFamily: 'sans-serif-condensed', textAlignVertical: 'center'}}>{item.accountName}</Text>
                                <Image style = {{height: 24, width: 24}} source = {item.accountIcon} resizeMode = 'contain' />
                            </View>
                        )
                    }}/>
                </View>
            </View>
        );
    }

}
