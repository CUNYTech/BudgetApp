/**
 * Filename: loginForm.js
 * Purpose: This file creates the login fields and button for logging in and is used fo Login.js file
 * LINE 23-36 are for the username/email input and has custom keyboard functions
 * for that (@ symbol displayed by default).
 * LINE 37-51 are for the password input.
 * LINE 46 is a must as it masks the users password upon entry.
 * LINE 53-55 are for the button, placement and style are dictated by the style container for it.
 * Created By: John Nolcox
 * Last Update: 5:40PM 15FEB17 by John Nolcox
**/

import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class loginForm extends Component {
    render() {
        return (
            <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                />
              <TextInput
                //changes the text in the background
                placeholder="username or email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                underlineColorAndroid='transparent'
                //for iOS change next line to 'returnKeyType'
                returnKeyLabel="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                //this allows the textinput to switch to the next input automatically
                onSubmitEditing={() => this.passwordInput.focus()}
                style={styles.input}
                />
              <TextInput
                //changes the text in the bacground
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                underlineColorAndroid='transparent'
                //for iOS change next line to 'returnKeyType'
                returnKeyLabel="Go"

                //IMPORTANT - this "hides" the password as it is typed
                secureTextEntry

                style={styles.input}
                //before mentioned reference for auto switching of input after pressing enter in email
                ref={(input) => this.passwordInput = input}
                />

              <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

/**
 * The below code are all the style references used above
 */

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});
