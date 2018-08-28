import React, { Component } from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import AppBar from './AppBar';
import { scaleHeight, scaleWidth, scaleFont } from './scale';

export default class Spendings extends Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem({item}) {
        console.log(item);
        return (
            <View style = {{backgroundColor: 'white', width: '100%', height: scaleHeight(132), paddingHorizontal: scaleWidth(8), marginBottom: scaleWidth(12),}}>
                <TouchableOpacity activeOpacity = {0.7} style = {{backgroundColor: 'white', width: '100%', height: scaleHeight(129), borderLeftColor: '#2274A5FF', borderLeftWidth: 2, elevation: 2}} onPress = {() => this.setState({selectedItem: item})}>
                    <View style = {{flexDirection: 'row', width: '100%', paddingHorizontal: scaleWidth(16), marginTop: scaleHeight(12)}}>
                        <Image style = {{height: scaleHeight(24), width: scaleWidth(24)}} />
                            <Text style = {{width: scaleWidth(92), fontSize: scaleFont(16), fontFamily: 'sans-serif-condensed', color: 'black', marginLeft: 16}}>Restaurant</Text>
                        <View style = {{position: 'absolute', right: 0, flexDirection: 'row'}}>
                            <Image style = {{marginRight: scaleWidth(12), height: scaleHeight(24), width: scaleWidth(24)}} resizeMode = 'contain' source = {require('../assets/reveal.png')}/>
                            <Image style = {{height: scaleWidth(24), width: scaleWidth(24), marginRight: scaleWidth(12)}} resizeMode = 'contain' source = {require('../assets/expand-down-24px.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        // let {categories} = this.state;
        let categories = [{

        },{}];
        return (
            <View style = {{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <AppBar text = 'Spendings' />
                <View style = {{backgroundColor: 'white', width: '100%', flex: 1, borderBottomColor: '#0000000D', borderBottomWidth: 1}}>
                
                </View>
                <View style = {{backgroundColor: 'white', marginTop: scaleHeight(56), flex: 1.3}}>
                    <FlatList style = {{height: '100%', width: '100%'}}
                    showsVerticalScrollIndicator = {false}
                    data = {categories}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem = {this.renderItem}/>
                </View>
            </View>
        );
    }

}

const CategoryDetailsComponent = props => {

    return (
        <View style = {{width: '100%', height: '100%'}}>
        
        </View>
    );
}