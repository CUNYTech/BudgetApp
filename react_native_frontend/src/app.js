import React, { Component } from 'react';
import { Image, StyleSheet}  from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard, Friends, Goals, Budget} from './pages';
import {pointHelpers} from './utils/pointHelpers';
import * as firebase from "firebase";

const firebaseConfig= require('../firebaseconfig.json');
const firebaseApp = firebase.initializeApp(firebaseConfig);
export {firebaseApp};

const getScenceStyle = (scene) => {
    let style = {
        backgroundColor: 'transparent'
    };
    if (scene.navigationState.index !== scene.scene.index) {
        style = {
            ...style,
            opacity: 0
        };
    }
    return style;
};

export default class App extends Component {
    render(){
        return (
          <Image source={require('./images/background.png')} style={styles.backgroundImage}>
              <Router getSceneStyle={getScenceStyle}>
                  <Scene key="home" component={Home} Firebase = {firebaseApp} hideNavBar/>
                  <Scene key="login" component={Login} Firebase = {firebaseApp} hideNavBar/>
                  <Scene key="register" component={Register} Firebase = {firebaseApp} hideNavBar/>
                  <Scene key="dashboard" component={Dashboard} Firebase = {firebaseApp} initial hideNavBar/>
                  <Scene key="friends" component={Friends} Firebase = {firebaseApp} hideNavBar/>
                  <Scene key="goals" component={Goals} Firebase = {firebaseApp} hideNavBar/>
                  <Scene key="budget" component={Budget} Firebase = {firebaseApp} hideNavBar/>

              </Router>
          </Image>
       );
    }
}

styles = StyleSheet.create ({
  backgroundImage: {
    flex: 1,
    height: null,
    width: null
  }
})
