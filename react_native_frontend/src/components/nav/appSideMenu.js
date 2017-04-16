import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');

export default class AppSideMenu extends Component {

  handleNavPress(action) {
    action();
    this.props.toggleSideMenu();
  }

  renderMenuItems() {
    const menuDesc = [
      { id: 1, title: 'Dashboard', icon: 'th-large', nav: this.handleNavPress.bind(this, Actions.dashboard) },
      { id: 2, title: 'Daily Points', icon: 'bar-chart', nav: this.handleNavPress.bind(this, Actions.points) },
      { id: 3, title: 'Friends', icon: 'users', nav: this.handleNavPress.bind(this, Actions.friends) },
      { id: 4, title: 'Goals', icon: 'star', nav: this.handleNavPress.bind(this, Actions.goals) },
      { id: 5, title: 'Budget', icon: 'dollar', nav: this.handleNavPress.bind(this, Actions.budget) },
      { id: 6, title: 'Profile', icon: 'user', nav: this.handleNavPress.bind(this, Actions.profile) },
      { id: 7, title: 'Settings', icon: 'sliders', nav: this.handleNavPress.bind(this, Actions.settings) },
      { id: 8, title: 'Logout', icon: 'close', nav: this.handleNavPress.bind(this, Actions.home) },
    ];

 // backgroundColor: 'rgba(33, 33, 33, .1)',

    const menuItems = menuDesc.map(item => (
      <TouchableOpacity key={item.id} onPress={item.nav} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.2)', width: width * 0.4, height: width * 0.4, padding: 10, borderWidth: 0.5, borderColor: 'rgba(255,255,255,.3)' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={item.icon} size={35} color="white" />
          <Text style={{ fontSize: 15, fontFamily: 'OpenSans', alignSelf: 'center', color: 'white' }}>{item.title}</Text>
        </View>
      </TouchableOpacity>));
    return menuItems;
  }

  render() {
    const sideMenuItems = this.renderMenuItems();

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(255, 193, 7, .8)', paddingTop: 60 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: height * 0.21 }}>
          { sideMenuItems }
        </View>
      </View>
    );
  }
}
