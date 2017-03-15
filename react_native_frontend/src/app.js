import React, { Component } from 'react';
import { Image, StyleSheet, View, Text}  from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard, Friends, Goals, Budget} from './pages';

import {pointHelpers} from './utils/pointHelpers';
import * as firebase from "firebase";
import {SideMenu, List, ListItem} from 'react-native-elements';
import Icon from 'react-native-elements';

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
      isOpen: false,
      show: true
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
      onPress: '{this.props.dashboard.bind(this)}'
    },
    {
      title: 'Daily Points',
      icon: 'timeline',
      onPress: '' //future points page
    },
    {
      title: 'Friends',
      icon: 'people',
      onPress: '{this.props.friends.bind(this)}'
    },
    {
      title: 'Goals',
      icon: 'stars',
      onPress: '{this.props.goals.bind(this)}'
    },
    {
      title: 'Budget',
      icon: 'insert-chart',
      onPress: '{this.props.budget.bind(this)}'
    },
    {
      title: 'Settings',
      icon: 'settings',
      onPress: "" //for the future settings page
    }
  ]

  var items =[];
  list.forEach(function(item, i){
     items.push(
       <ListItem
         key={i}
         title={item.title}
         leftIcon={{name: item.icon}}
         onPress={item.onPress}
       />);
   });
  return items
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
    const Items = this.Items()
    const Menu = (
      <View style={
        {flex: 1,
        backgroundColor: 'white',
        paddingTop: 40}}>
        <List>
          { Items }
        </List>
        <Text>
          v0.0.1
        </Text>
      </View>)

    return (
      <SideMenu isOpen={this.state.isOpen} menu={Menu} disableGestures={this.state.show}>
        <Image source={require('./images/background.png')} style={styles.backgroundImage}>
            <Router getSceneStyle={getScenceStyle}>
                <Scene hideNavBar key="home" component={Home} Firebase={firebaseApp} initial hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="login" component={Login} Firebase={firebaseApp} hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="register" component={Register} Firebase={firebaseApp} hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="dashboard" component={Dashboard} Firebase={firebaseApp} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="friends" component={Friends} Firebase={firebaseApp} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="goals" component={Goals} Firebase={firebaseApp} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="budget" component={Budget} Firebase={firebaseApp} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
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
