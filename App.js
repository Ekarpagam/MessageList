import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator,NavigationActions} from 'react-navigation';


import ListMsgScreen from './Comp/ListMsg';
import MsgScreen from './Comp/Msg';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const MainNavigator = createStackNavigator({
  
  ListMsg: {
    screen: ListMsgScreen,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  Msg: {
    screen: MsgScreen,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },

 });

export default MainNavigator