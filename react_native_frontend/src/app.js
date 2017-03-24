import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Navigator}  from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard, Friends, Goals, Budget, Points, Settings, Profile} from './pages';
import {pointHelpers} from './utils/pointHelpers';
import * as firebase from "firebase";
import {SideMenu, List, ListItem} from 'react-native-elements';
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

  constructor () {
    super();
    this.state = {
      isOpen: false,
      show: true,
      list: []
    }

  }

  componentDidMount() {
    const menuDesc = [
      { id: 1, title: 'Dashboard', icon: 'apps', nav: Actions.dashboard.bind(this) },
      { id: 2, title: 'Daily Points', icon: 'timeline', nav: Actions.points.bind(this) },
      { id: 3, title: 'Friends', icon: 'people', nav: Actions.friends.bind(this)},
      { id: 4, title: 'Goals', icon: 'stars', nav: Actions.goals.bind(this) },
      { id: 5, title: 'Budget', icon: 'insert-chart', nav: Actions.budget.bind(this) },
      { id: 6, title: 'Profile', icon: 'account-circle', nav: Actions.profile.bind(this) },
      { id: 7, title: 'Settings', icon: 'settings', nav: Actions.settings.bind(this) },
      { id: 8, title: 'Logout', icon: 'close', nav: Actions.home.bind(this) }
    ]
    const menuItems = menuDesc.map(function(item) {
      return (<TouchableOpacity onPress={item.nav}>
                <ListItem
                  key={item.id}
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
              </TouchableOpacity>);
    })

    this.setState({
      list: [<View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: 40
              }}>
          <List>
            { menuItems }
          </List>
          <Text style={{fontSize: 8}}>
            v0.0.2
          </Text>
        </View>]
    })
  }

  logout() {
    Actions.home();
    this.toggleSideMenu();
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  hideSideMenu () {
    this.setState({
      isOpen: false
    })
  }

  Items() {

  }

  deactivateSideMenu() {
    this.setState({
      show: false
    })
  }

  activateSideMenu() {
    this.setState({
      show: true
    })
  }

  render(){
    const Menu = this.state.list[0];

    return (
      <SideMenu isOpen={this.state.isOpen} menu={Menu} disableGestures={this.state.show}>
        <View style={styles.backgroundImage}>
            <Router getSceneStyle={getScenceStyle}>
                <Scene hideNavBar key="home" component={Home} Firebase={firebaseApp} initial hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="login" component={Login} Firebase={firebaseApp} hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="register" component={Register} Firebase={firebaseApp} hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="dashboard" component={Dashboard} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="friends" component={Friends} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="goals" component={Goals} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="budget" component={Budget} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="points" component={Points} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="settings" component={Settings} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="profile" component={Profile} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
            </Router>
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
