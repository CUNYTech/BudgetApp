
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, InteractionManager, Alert,} from 'react-native';
import { Input, Button, Logo, Heading, BackButton, AlertStatus } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import * as firebase from 'firebase';

export default class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        animation: {
            headerPositionTop: new Animated.Value(-148),
            formPositionLeft: new Animated.Value(614),
            buttonPositionTop: new Animated.Value(1354)
        }
    }

    // Add new user to Firebase DB
    async _register(){
    try{
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        Alert.alert('Account created');
    }
    catch(e){
        Alert.alert(e);
        // Handle exceptions
    }
}

    componentDidMount() {
        Animated.timing(this.state.animation.headerPositionTop, {
            toValue: 0,
            duration: 725,
            delay: 100
        }).start();
        Animated.timing(this.state.animation.formPositionLeft, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.animation.buttonPositionTop, {
            toValue: 0,
            duration: 600,
            delay: 130
        }).start();
    }

    handleChangeInput(stateName, text) {
        this.setState({
            [stateName]: text
        });
    }

    unmountComponent(callback) {
        const timing = Animated.timing;
        Animated.parallel([
            timing(this.state.animation.headerPositionTop, {
                toValue: -148,
                duration: 400,
                delay: 100
            }),
            timing(this.state.animation.formPositionLeft, {
                toValue: 614,
                duration: 500,
                delay: 120
            }),
            timing(this.state.animation.buttonPositionTop, {
                toValue: 1354,
                duration: 400,
                delay: 130
            })
        ]).start(callback);
    }

    handleBack() {
        this.unmountComponent(() => {
            Actions.pop();
        });
    }

    handleLogin() {
        this.unmountComponent(() => {
            Actions.login();
        });
    }

    render() {
        return (
          <View style={loginStyle.container}>
            <BackButton
              transparent iconLeft="arrow-left-circle"
              onPressIcon={this.handleBack.bind(this)}
            />
            <View style={loginStyle.loginContainer}>
              <Animated.View style={{position: 'relative', top: this.state.animation.headerPositionTop}}>
                <Heading color="#ffffff" textAlign="center">
                  {/* {'Sign up'} */}
                </Heading>
              </Animated.View>
              <Logo marginTop={25}/>
                <View style={loginStyle.formContainer}>
                <Animated.View style={{position: 'relative', left: this.state.animation.formPositionLeft}}>
                  <Input label="Username"
                    autoCorrect = {false}
                    value={this.state.username}
                    onChange={this.handleChangeInput.bind(this, 'username')}
                  />
                  <Input label="Email"
                    autoCorrect = {false}
                    value={this.state.email}
                    marginTop={23}
                    onChange={this.handleChangeInput.bind(this, 'email')}
                  />
                  <Input label="Password"
                    autoCorrect = {false}
                    value={this.state.password}
                    marginTop={23}
                    onChange={this.handleChangeInput.bind(this, 'password')}
                    secureTextEntry
                  />
                </Animated.View>
                <Animated.View style={{position: 'relative', top: this.state.animation.buttonPositionTop}}>
                  <Button marginTop={getPlatformValue('android',25, 38)} width={200} onPress={this._register.bind(this)}>
                    Create
                  </Button>
                </Animated.View>
              </View>
            </View>
            <AlertStatus style={{fontFamily:'OpenSans'}}
              textHelper="Have an account? "
              textAction="Login"
              onPressAction={this.handleLogin.bind(this)}
            />
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
        paddingTop: getPlatformValue('android', 10, 30),
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: getPlatformValue('android', 5, 34),
        backgroundColor: 'transparent'
    }
});
