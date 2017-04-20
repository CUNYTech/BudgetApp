import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { Input, Button, Logo, Heading, BackButton, AlertStatus } from '../components';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import * as firebase from 'firebase';
import { _updatePoints } from '../utils/pointHelpers';


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
      animation: {
        usernamePostionLeft: new Animated.Value(795),
        passwordPositionLeft: new Animated.Value(905),
        loginPositionTop: new Animated.Value(1402),
        statusPositionTop: new Animated.Value(1542),
      },
      errors: '',
    };
  }


    // User Login Authentication
  async _login() {
    if (!(this.state.email.includes('@')) || !(this.state.email.includes('.')) || (this.state.email.includes('@.')) || (this.state.password === '') || (this.state.email.includes(' '))) {
      this.setState({ errors: 'Please type in a valid email or password.' });
      return;
    }
    try {
      await this.props.Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

      const user = this.props.Firebase.auth().currentUser;
      let name,
        email,
        photoUrl,
        uid,
        emailVerified;

      if (user) {
        uid = user.uid;
      }
      const event_10 = 10;
      _updatePoints(event_10, uid);

      setTimeout(() => Actions.dashboard(), 0);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        this.setState({
          errors: 'Email invalid.',
        });
      } else if (errorCode === 'auth/user-not-found') {
        Actions.register({ errors: 'Email has not been registered. Please sign up.' });
      } else {
        this.setState({
          errors: 'Please try to login again.',
        });
      }
    }
  }


  componentDidMount() {
    const timing = Animated.timing;
    Animated.parallel([
      timing(this.state.animation.usernamePostionLeft, {
        toValue: 0,
        duration: 700,
      }),
      timing(this.state.animation.passwordPositionLeft, {
        toValue: 0,
        duration: 900,
      }),
      timing(this.state.animation.loginPositionTop, {
        toValue: 0,
        duration: 700,
      }),
      timing(this.state.animation.statusPositionTop, {
        toValue: 0,
        duration: 700,
      }),
    ]).start();
  }

  handleChangeInput(stateName, text) {
    this.setState({
      [stateName]: text,
    });
  }

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
          transparent iconLeft="arrow-left-circle"
          onPressIcon={this.handleToHome.bind(this)}
        />
        <View style={loginStyle.loginContainer}>
          <Logo />
          <View style={loginStyle.formContainer}>
            <Animated.View style={{ position: 'relative', left: this.state.animation.usernamePostionLeft }}>
              <Text style={{ color: 'red', fontSize: 12 }}>{this.state.errors}</Text>
              <Input
                autoCorrect={false}
                keyboardType="email-address"
                label="Email"
                value={this.state.email}
                onChange={this.handleChangeInput.bind(this, 'email')}
              />
            </Animated.View>
            <Animated.View style={{ position: 'relative', left: this.state.animation.passwordPositionLeft }}>
              <Input
                label="Password"
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
    backgroundColor: 'transparent',
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
    marginTop: getPlatformValue('android', 25, 45),
  },
});
