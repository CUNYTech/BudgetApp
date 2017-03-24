import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Navigator}  from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard, Friends, Goals, Budget, Points, Settings, Profile} from './pages';
import { pointHelpers } from './utils/pointHelpers';
import * as firebase from "firebase";
import { SideMenu, List, ListItem } from 'react-native-elements';
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
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  componentDidMount() {
    const menuDesc = [
      { id: 1, title: 'Dashboard', icon: 'apps', nav: this.handleNavPress.bind(this, Actions.dashboard) },
      { id: 2, title: 'Daily Points', icon: 'timeline', nav: this.handleNavPress.bind(this, Actions.points) },
      { id: 3, title: 'Friends', icon: 'people', nav: this.handleNavPress.bind(this, Actions.friends) },
      { id: 4, title: 'Goals', icon: 'stars', nav: this.handleNavPress.bind(this, Actions.goals) },
      { id: 5, title: 'Budget', icon: 'insert-chart', nav: this.handleNavPress.bind(this, Actions.budget) },
      { id: 6, title: 'Profile', icon: 'account-circle', nav: this.handleNavPress.bind(this, Actions.profile) },
      { id: 7, title: 'Settings', icon: 'settings', nav: this.handleNavPress.bind(this, Actions.settings) },
      { id: 8, title: 'Logout', icon: 'close', nav: this.handleNavPress.bind(this, Actions.home) }
    ]
    const menuItems = menuDesc.map(function(item) {
      return (<TouchableOpacity onPress={item.nav} >
                <ListItem
                  key={item.id}
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
              </TouchableOpacity>);
    })

    this.setState({
      list: (<View style={{
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
        </View>)
    })
  }

  handleNavPress(action){
    action()
    this.toggleSideMenu();
  }

  logout() {
    Actions.home();
    this.toggleSideMenu();
  }

  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render(){
    const Menu = this.state.list;

    return (
      <SideMenu isOpen={this.state.isOpen} menu={Menu} disableGestures={this.state.show}>
        <View style={styles.backgroundImage}>
            <Router getSceneStyle={getScenceStyle}>
                <Scene hideNavBar key="home" component={Home} type="reset" Firebase={firebaseApp} initial />
                <Scene hideNavBar key="login" component={Login} type="reset" Firebase={firebaseApp} />
                <Scene hideNavBar key="register" component={Register} type="reset" Firebase={firebaseApp} />
                <Scene hideNavBar key="dashboard" component={Dashboard} type="reset" Firebase={firebaseApp} sideMenu={ this.toggleSideMenu } />
                <Scene hideNavBar key="friends" component={Friends} type="reset" Firebase={firebaseApp} sideMenu={ this.toggleSideMenu } />
                <Scene hideNavBar key="goals" component={Goals} type="reset" Firebase={firebaseApp} sideMenu={ this.toggleSideMenu } />
                <Scene hideNavBar key="budget" component={Budget} type="reset" Firebase={firebaseApp} sideMenu={ this.toggleSideMenu } />
                <Scene hideNavBar key="points" component={Points} type="reset" Firebase={firebaseApp} sideMenu={ this.toggleSideMenu } />
                <Scene hideNavBar key="settings" component={Settings} type="reset" Firebase={firebaseApp} sideMenu={ this.toggleSideMenu } />
                <Scene hideNavBar key="profile" component={Profile} type="reset" Firebase={firebaseApp} sideMenu={ this.toggleSideMenu } />
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
