import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Navigator}  from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard, Friends, Goals, Budget, Points, Profile} from './pages';
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
    this.setState({
      list: [<View style={
          {flex: 1,
          backgroundColor: 'white',
          paddingTop: 40}}>
          <List>
            <TouchableOpacity onPress={Actions.dashboard.bind(this)}>
            <ListItem
                key={1}
                title={'Dashboard'}
                leftIcon={{name: 'apps'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.points.bind(this)}>
              <ListItem
                key={2}
                title={'Daily Points'}
                leftIcon={{name: 'timeline'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.friends.bind(this)}>
              <ListItem
                key={3}
                title={'Friends'}
                leftIcon={{name: 'people'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.goals.bind(this)}>
              <ListItem
                key={4}
                title={'Goals'}
                leftIcon={{name: 'stars'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.budget.bind(this)}>
              <ListItem
                key={5}
                title={'Budget'}
                leftIcon={{name: 'insert-chart'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.profile.bind(this)}>
              <ListItem
              key={6}
              title={'Profile'}
              leftIcon={{name: 'account-circle'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.dashboard.bind(this)}>
              <ListItem
              key={6}
              title={'Settings'}
              leftIcon={{name: 'settings'}}
              />
            </TouchableOpacity>
          </List>
          <Text>
            v0.0.1
          </Text>
        </View>]
    })
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
        <Image source={require('./images/background.png')} style={styles.backgroundImage}>
            <Router getSceneStyle={getScenceStyle}>
                <Scene hideNavBar key="home" component={Home} Firebase={firebaseApp} initial hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="login" component={Login} Firebase={firebaseApp} hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="register" component={Register} Firebase={firebaseApp} hideSideMenu={this.deactivateSideMenu.bind(this)}/>
                <Scene hideNavBar key="dashboard" sceneConfig={Navigator.SceneConfigs.FloatFromRight} component={Dashboard} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="friends" component={Friends} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="goals" component={Goals} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="budget" component={Budget} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="points" component={Points} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
                <Scene hideNavBar key="profile" component={Profile} Firebase={firebaseApp} hideSideMenu={this.hideSideMenu.bind(this)} sideMenu={this.toggleSideMenu.bind(this)} showSideMenu={this.activateSideMenu.bind(this)}/>
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
    width: null,
    backgroundColor: 'white'

  }
});
