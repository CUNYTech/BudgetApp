import React, { Component } from 'react';
import { StyleSheet, View, Text }  from 'react-native';
import { AppSideMenu, AppRouter } from './components';
import { SideMenu } from 'react-native-elements';

import * as firebase from "firebase";
const firebaseConfig= require('../firebaseconfig.json');
const firebaseApp = firebase.initializeApp(firebaseConfig);
export { firebaseApp };

export default class App extends Component {

  constructor () {
    super();
    this.state = {
      isOpen: false,
      show: true
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  toggleSideMenu() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderSideMenu() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 40
        }}
      >
        <AppSideMenu toggleSideMenu={this.toggleSideMenu} />
        <Text style={{fontSize: 8}}> v0.0.2 </Text>
      </View>
    )
  }

  render(){
    const menu = this.renderSideMenu();

    return (
      <SideMenu isOpen={this.state.isOpen} menu={menu} disableGestures={this.state.show}>
        <View style={styles.backgroundImage}>
          <AppRouter
            toggleSideMenu={this.toggleSideMenu}
            handleNavPress={this.handleNavPress}
            firebaseApp={firebaseApp}
          />
        </View>
      </SideMenu>
    );
  }
}

styles = StyleSheet.create ({
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
    backgroundColor: '#2196f3'
  }
});
