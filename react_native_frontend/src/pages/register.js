import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, Animated } from 'react-native';
import { Input, Button, Logo, Heading, BackButton, AlertStatus } from '../components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import { _updatePoints } from '../utils/pointHelpers';


// const rootRef = firebaseApp.database().ref();
// const itemsRef = rootRef.child('items');

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      animation: {
        headerPositionTop: new Animated.Value(-148),
        formPositionLeft: new Animated.Value(614),
        buttonPositionTop: new Animated.Value(1354),
      },
      errors: '',
    };
  }


    // Add new user to Firebase DB
  async _register() {
    if (!(this.state.email.includes('@')) || (this.state.email.includes(' ')) || !(this.state.email.includes('.')) || (this.state.email.includes('@.'))) {
      this.setState({ errors: 'Please use a valid email.' });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({ errors: 'Password must me at least 6 characters in length.' });
      return;
    }
    if (this.state.username.length < 1) {
      this.setState({ errors: 'Type in a username.' });
      return;
    }

    try {
      await this.props.Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

      const user = this.props.Firebase.auth().currentUser;
      const ref = this.props.Firebase.database().ref();
      const userRef = ref.child('users/');

      user.updateProfile({
        displayName: this.state.username,
      });
      this._load(user);
      Actions.dashboard();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        this.setState({
          errors: 'Email is already in use.',
        });
      }
        // Handle exceptions
    }
  }

  _load(user) {
    const date = new Date().getDate();
    const ref = this.props.Firebase.database().ref();

        // Pull user profile
        // THIS IS WHERE TO PULL PHOTO URL AND THEN WRITE IT TO SEARCH INDEX FOR FRIENDS PAGE
    let name,
      email,
      photoUrl,
      uid,
      emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
        // Create UID nodes in DB
        // let searchIndexRef = ref.child('people');
    const userPointsRef = ref.child('userReadable/userPoints').child(uid);
        // let userFriendsRef = ref.child('userReadable/userFriends').child(uid);
    const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);
    const userBudgetRef = ref.child('userReadable/userBudget').child(uid);
    const userSavingsRef = ref.child('userReadable/userSavings').child(uid);
    const userDailyPointsRef = ref.child('userReadable/userDailyPoints').child(uid);

    const peopleRef = ref.child('/people');

    setTimeout(() => userPointsRef.set({
      displayName: this.state.username,
      points: 0,
    }), 0);

    setTimeout(() => userDailyPointsRef.set({
      date,
      points: 0,
    }), 0);

    const event_10 = 10;
    _updatePoints(event_10, uid);

        // setTimeout(()=> userFriendsRef.set({
        //   displayName: this.state.username,
        //   friends:''
        // }),0);

    setTimeout(() => userTotalExpensesRef.set({
      displayName: this.state.username,
      expenses: 0,
    }), 0);

    setTimeout(() => userBudgetRef.set({
      displayName: this.state.username,
      budget: 0,
    }), 0);

    setTimeout(() => userSavingsRef.set({
      displayName: this.state.username,
      savings: 0,
    }), 0);

     // THIS IS WHERE TO ADD PHOTOURL TO BE WRITEN TO PEOPLE SEARCH INDEX
    setTimeout(() => peopleRef.child(this.state.username).set({
      displayName: this.state.username,
      uid,
      photoUrl: 'https://static.pexels.com/photos/7613/pexels-photo.jpg',
    }), 0);
  }


  componentDidMount() {
    Animated.timing(this.state.animation.headerPositionTop, {
      toValue: 0,
      duration: 725,
      delay: 100,
    }).start();
    Animated.timing(this.state.animation.formPositionLeft, {
      toValue: 0,
      duration: 700,
      delay: 120,
    }).start();
    Animated.timing(this.state.animation.buttonPositionTop, {
      toValue: 0,
      duration: 600,
      delay: 130,
    }).start();
  }

  handleChangeInput(stateName, text) {
    this.setState({
      [stateName]: text,
    });
  }

  unmountComponent(callback) {
    const timing = Animated.timing;
    Animated.parallel([
      timing(this.state.animation.headerPositionTop, {
        toValue: -148,
        duration: 400,
        delay: 100,
      }),
      timing(this.state.animation.formPositionLeft, {
        toValue: 614,
        duration: 500,
        delay: 120,
      }),
      timing(this.state.animation.buttonPositionTop, {
        toValue: 1354,
        duration: 400,
        delay: 130,
      }),
    ]).start(callback);
  }

  handleLogin() {
    this.unmountComponent(() => {
      Actions.login();
    });
  }

  render() {
    let errors = '';
    if (this.state.errors != '') {
      errors = this.state.errors;
    } else {
      errors = this.props.errors;
    }

    return (
      <View style={loginStyle.container}>
        <BackButton
          transparent iconLeft="arrow-left-circle"
          onPressIcon={this.handleLogin.bind(this)}
        />
        <View style={loginStyle.loginContainer}>
          <KeyboardAvoidingView keyboardVerticalOffset={-100} behavior="position" style={loginStyle.formContainer}>
            <Logo marginTop={26} />
            <Animated.View style={{ position: 'relative', left: this.state.animation.formPositionLeft }}>
              <Text style={{ color: 'red', fontSize: 12 }}>{errors}</Text>
              <Input
                label="Username"
                autoCorrect={false}
                value={this.state.username}
                onChange={this.handleChangeInput.bind(this, 'username')}
              />
              <Input
                keyboardType="email-address"
                label="Email"
                autoCorrect={false}
                value={this.state.email}
                marginTop={23}
                onChange={this.handleChangeInput.bind(this, 'email')}
              />
              <Input
                label="Password"
                autoCorrect={false}
                value={this.state.password}
                marginTop={23}
                onChange={this.handleChangeInput.bind(this, 'password')}
                secureTextEntry
              />
            </Animated.View>
            <Animated.View style={{ position: 'relative', top: this.state.animation.buttonPositionTop }}>
              <Button marginTop={getPlatformValue('android', 25, 38)} width={200} onPress={this._register.bind(this)}>
                Create
              </Button>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
        <AlertStatus
          style={{ fontFamily: 'OpenSans' }}
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
    paddingTop: getPlatformValue('android', 10, 40),
  },
  formContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: getPlatformValue('android', 5, 34),
    backgroundColor: 'transparent',
  },
});
