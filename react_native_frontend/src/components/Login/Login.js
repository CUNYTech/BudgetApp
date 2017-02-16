import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
    render() {
        return (
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
