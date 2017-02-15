 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View
 } from 'react-native';
 import Splash from './Splash';
 import Login from './src/components/Login/Login';

export default class BudgetApp extends Component {
  render() {
    return (
      <Login />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#424242',
//   },
//   welcome: {
//     fontSize: 24,
//     textAlign: 'center',
//     margin: 10,
//     color: #000000,
//   },
//   inspiration: {
//     fontSize: 20,
//     textAlign: 'center',
//     color: #000000,
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('BudgetApp', () => BudgetApp);
