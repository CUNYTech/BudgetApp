import React, { Component } from 'react';
import { Image, StyleSheet, View}  from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard, Friends, Goals, Budget} from './pages';

import {pointHelpers} from './utils/pointHelpers';
import * as firebase from "firebase";
import {SideMenu, List, ListItem} from 'react-native-elements'

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
    super()
    this.state = {
      isOpen: false
    }

  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  Items() {
    const list = [{
      title: 'Dashboard',
      icon: 'apps',
      onPress: ""
    },
    {
      title: 'Daily Points',
      icon: 'bubble chart',
      onPress: ""
    },
    {
      title: 'Friends',
      icon: 'people',
      onPress: ""
    },
    {
      title: 'Goals',
      icon: 'stars',
      onPress: ""
    },
    {
      title: 'Budget',
      icon: 'attach money',
      onPress: ""
    },
    {
      title: 'Settings',
      icon: 'settings',
      onPress: ""
    }
  ]

  var items =[];
  list.forEach(function(item, i){
     items.push(
       <ListItem
         key={i}
         title={item.title}
         leftIcon={item.icon}
         onPressIcon={item.onPress}
       />);
   });
  return items
  }

  render(){
    const Items = this.Items()
    const Menu = (<View style={{flex: 1, backgroundColor: 'ededed', paddingTop: 50}}>
                    <List>
                      { Items }
                    </List>
                  </View>)
    return (
      <SideMenu isOpen={this.state.isOpen} menu={Menu}>
        <Image source={require('./images/background.png')} style={styles.backgroundImage}>
            <Router getSceneStyle={getScenceStyle}>
                <Scene key="home" component={Home} sideMenu={this.toggleSideMenu.bind(this)} Firebase={firebaseApp} initial hideNavBar/>
                <Scene key="login" component={Login} sideMenu={this.toggleSideMenu.bind(this)} Firebase={firebaseApp} hideNavBar/>
                <Scene key="register" component={Register} sideMenu={this.toggleSideMenu.bind(this)} Firebase={firebaseApp} hideNavBar/>
                <Scene key="dashboard" component={Dashboard} sideMenu={this.toggleSideMenu.bind(this)} Firebase={firebaseApp} hideNavBar/>
                <Scene key="friends" component={Friends} sideMenu={this.toggleSideMenu.bind(this)} Firebase={firebaseApp} hideNavBar/>
                <Scene key="goals" component={Goals} sideMenu={this.toggleSideMenu.bind(this)} Firebase={firebaseApp} hideNavBar/>
                <Scene key="budget" component={Budget} sideMenu={this.toggleSideMenu.bind(this)} Firebase={firebaseApp} hideNavBar/>
            </Router>
        </Image>
      </SideMenu>
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
