/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View
 } from 'react-native';

export default class BudgetApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is our BudgetApp!
        </Text>
        <Text style={styles.inspiration}>
        This is just the beginning of our 10 week marathon!
        </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: #000000,
  },
  inspiration: {
    fontSize: 20,
    textAlign: 'center',
    color: #000000,
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BudgetApp', () => BudgetApp);
