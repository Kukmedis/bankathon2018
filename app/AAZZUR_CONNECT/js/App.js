/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Login from './Login';
import AddAccount from './AddAccount';
import Accounts from './Accounts';
import Spendings from './Spendings';
import colors from './colors';
import Settings from './Settings';

const styles = StyleSheet.create({
  bottomBarStyle: {
    backgroundColor: colors.blue, 
    height: 56
  },
  tabBarActiveLabel: {
      height: 16,
      marginBottom: 8,
      fontFamily: 'sans-serif-condensed',
      fontSize: 12,
      color: '#FFFFFFFF',
      opacity: 1,
      textAlignVertical: 'center',
      textAlign: 'center'
  },
  tabBarInActiveLabel: {
      height: 16,
      marginBottom: 7,
      marginTop: 1,
      fontFamily: 'sans-serif-condensed',
      fontSize: 10,      
      color: '#FFFFFFFF',
      opacity: 0.8,
      textAlignVertical: 'center',
      textAlign: 'center'
  },
  tabBarIcon: {
      marginTop: 8,
      height: 24,
      width: 24
  }
});

const BottomNav = createBottomTabNavigator({
  Accounts: {screen: Accounts},
  Spendings: {screen: Spendings},
  Settings: {screen: Settings}
},
{
  tabBarOptions: {
    style: styles.bottomBarStyle,
},
navigationOptions: ({navigation}) => {
  return ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let imageSource;
    
      if(routeName === 'Accounts') 
        imageSource = require('../assets/accounts.png');
      else if(routeName === 'Spendings')
        imageSource = require('../assets/spendings.png');
      else if(routeName === 'Settings')
        imageSource = require('../assets/settings.png');
     
      return <Image style = {[styles.tabBarIcon, {opacity: focused ? 1 : 0.7}]} source = {imageSource} resizeMode = 'contain' />
    },
    tabBarLabel: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let text;
      if(routeName === 'Accounts') 
        text = 'Accounts';
      else if(routeName === 'Spendings')
        text = 'Spendings';
      else if(routeName === 'Settings')
        text = 'Settings';
      else
        text = I18n.translate('homeScreen').tabBarLabels.settings;
      return <Text style = {focused ? styles.tabBarActiveLabel : styles.tabBarInActiveLabel}>{text}</Text>
    },
    
  })
}});

const StackNavigator = createStackNavigator({
  Login: {screen: Login},
  AddAccount: {screen: AddAccount},
  MainScreen: {screen: BottomNav}
},{
  headerMode: 'none'
});

export default class App extends Component {
  render() {
    return (
     <StackNavigator key = 'AAZZUR_CONNECT' style = {{backgroundColor: 'white', width: '100%', height: '100%'}} />
    );
  }
}
