/**
 * Filename: Login.js
 * Purpose: This file creates the login page.
 * Created By: John Nolcox
 * Last Update: 6:01PM 15FEB17 by John Nolcox
**/

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView
} from 'react-native';

import LoginForm from './loginForm';

export default class login extends Component {
    render() {
        return (
          // The following line of code allows everything on screen to move up for the keyboard to appear
          // instead of the keyboard covering whatever was there.
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../../images/wallet.png')}
                />

                <Text style={styles.logoTitle}>An app made for budgeting with rewards!</Text>
              </View>
              <View style={styles.formContainer}>
                <LoginForm />
              </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    },
    logo: {
      width: 100,
      height: 100
    },
    logoTitle: {
      color: '#FFF',
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.9
    }
});
