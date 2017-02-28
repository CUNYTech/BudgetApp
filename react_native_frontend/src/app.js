import React, { Component } from 'react';
import { Image, StyleSheet}  from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard} from './pages';
import * as firebase from 'firebase';

const firebaseConfig= require('../firebaseconfig.json')

const firebaseApp = firebase.initializeApp(firebaseConfig)

 /*const database = firebase.database()
 const userRef = database.ref('losers');
 //
 userRef.push({
   username: 'simplemath',
   email: 'okaygo'
 });*/


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
                  <Scene key="home" component={Home} initial hideNavBar/>
                  <Scene key="login" component={Login} hideNavBar/>
                  <Scene key="register" component={Register} hideNavBar/>
                  <Scene key="dashboard" component={Dashboard} hideNavBar/>
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
