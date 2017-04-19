import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import { Drawer } from 'native-base';
import { AppSideMenu, AppRouter } from './components';

const firebaseConfig = require('../firebaseconfig.json');

const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp };

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  toggleSideMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Drawer
        type="overlay"
        tapToClose
        openDrawerOffset={60}
        ref={(ref) => { this._drawer = ref; }}
        content={<AppSideMenu toggleSideMenu={this.toggleSideMenu} />}
        open={this.state.isOpen}
        style={{ backgroundColor: 'transparent' }}
      >
        <View style={styles.background}>
          <AppRouter
            toggleSideMenu={this.toggleSideMenu}
            handleNavPress={this.handleNavPress}
            firebaseApp={firebaseApp}
          />
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: null,
    width: null,
    backgroundColor: '#212121',
  },
});
