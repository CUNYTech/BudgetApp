import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Alert, Animated} from 'react-native';
import { Input, Button, Logo, Heading, BackButton, AlertStatus } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import * as firebase from "firebase";

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        animation: {
            usernamePostionLeft: new Animated.Value(795),
            passwordPositionLeft: new Animated.Value(905),
            loginPositionTop: new Animated.Value(1402),
            statusPositionTop: new Animated.Value(1542)
        }
    }

    //User Login Authentication
    async _login(){
    try{
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

        setTimeout(() => Actions.dashboard(), 0);

    }
    catch(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Incorrect password.');
      }
        else if(errorCode === 'auth/invalid-email') {
          alert('Invalid email.');
      }
        else if(errorCode === 'auth/user-not-found') {
          alert('Please Register.');
          Actions.register();
      }
    }

    }

    componentDidMount() {
        const timing = Animated.timing;
        Animated.parallel([
            timing(this.state.animation.usernamePostionLeft, {
                toValue: 0,
                duration: 700
            }),
            timing(this.state.animation.passwordPositionLeft, {
                toValue: 0,
                duration: 900
            }),
            timing(this.state.animation.loginPositionTop, {
                toValue: 0,
                duration: 700
            }),
            timing(this.state.animation.statusPositionTop, {
                toValue: 0,
                duration: 700
            })
        ]).start();
    }

    handleChangeInput(stateName, text) {
        this.setState({
            [stateName]: text
        });
    }

    /*handePressSignIn() {
        Alert.alert('Button pressed', 'User sign in');
    }*/

    handlePressSignUp() {
        Actions.register();
    }

    handleToHome() {
        Actions.home({ type: ActionConst.RESET, disableInteractionCheck: true });
    }

  render() {
    return (
      <View style={loginStyle.container}>
        <BackButton
          iconLeft="home"
          onPressIcon={this.handleToHome.bind(this)}
        />
        <View style={loginStyle.loginContainer}>
          <Logo />
          <Heading style={{fontFamily:"OpenSans"}} marginTop={16} color="#ffffff" textAlign="center">
            {/* {'Hoola'} */}
            </Heading>
          <View style={loginStyle.formContainer}>
            <Animated.View style={{ position: 'relative', left: this.state.animation.usernamePostionLeft }}>
              <Input
                autoCorrect = {false}
                label="Email"
                value={this.state.email}
                onChange={this.handleChangeInput.bind(this, 'email')}
              />
            </Animated.View>
            <Animated.View style={{ position: 'relative', left: this.state.animation.passwordPositionLeft }}>
              <Input label="Password"
                value={this.state.password}
                marginTop={23}
                onChange={this.handleChangeInput.bind(this, 'password')}
                secureTextEntry
              />
              </Animated.View>
              <Animated.View style={{ position: 'relative', top: this.state.animation.loginPositionTop }}>
                <Button marginTop={60} onPress={this._login.bind(this)}>
                  Sign in
                </Button>
              </Animated.View>
            </View>
        </View>
        <Animated.View style={{ position: 'relative', top: this.state.animation.statusPositionTop }}>
          <AlertStatus
            textHelper="No account? "
            textAction="Sign up"
            onPressAction={this.handlePressSignUp.bind(this)}
          />
        </Animated.View>
      </View>
    );
  }
}

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
    loginContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 49,
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: getPlatformValue('android', 25, 45)
    }
});
