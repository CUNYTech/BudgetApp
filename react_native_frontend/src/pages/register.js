
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, InteractionManager, Alert,} from 'react-native';
import { Input, Button, Logo, Heading, BackButton, AlertStatus } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';


// const rootRef = firebaseApp.database().ref();
// const itemsRef = rootRef.child('items');

export default class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        animation: {
            headerPositionTop: new Animated.Value(-148),
            formPositionLeft: new Animated.Value(614),
            buttonPositionTop: new Animated.Value(1354)
        },
        errors: ''
    };


    // Add new user to Firebase DB
    async _register(){
    try{
        await this.props.Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)

        var user = this.props.Firebase.auth().currentUser;
        var ref = this.props.Firebase.database().ref();
        var userRef = ref.child('users/');


        user.updateProfile({
          displayName: this.state.username,
        });

         setTimeout(() => userRef.push({
           displayName: this.state.username,
           email: this.state.email,
           budget: 0,
           savings: 0,
           expenses: 0,
           level: 1,
           levelProgress: .01,
           points: 0,
           friends: [],
           goals: [],
           }),
              0);

        Actions.dashboard()

    }
    catch(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        this.setState({
          errors: 'Email is already in use.'
        })
      }
        // Handle exceptions
    };
};


    _load(){

       this.props.Firebase.auth().currentUser;
        //Pull user profile
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;
        }
        //Create UID nodes in DB
        var userPointsRef = ref.child('userReadable/userPoints').child(uid);
        var userFriendsRef = ref.child('userReadable/userFriends').child(uid);

        setTimeout(()=> userPointsRef.push({
          displayName: this.state.username,
          points:''
        }),0);

        setTimeout(()=> userFriendsRef.push({
          displayName: this.state.username,
          friends:''
        }),0);

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
      const {errors} = this.props
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
                  <Text style={{color: 'red', fontSize: 12}}>{this.state.errors}</Text>
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
