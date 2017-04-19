import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Dimensions, StyleSheet } from 'react-native';
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
      <TouchableOpacity key={item.id} onPress={item.nav} activeOpacity={0.8} style={styles.menuItem}>
        <View style={{ width: width * 0.8, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={item.icon} size={35} color="white" />
            <Text style={{ fontSize: 15, fontFamily: 'OpenSans', color: 'white', textAlign: 'right', margin: 10 }}>
              {item.title}
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color="white" />
        </View>
      </TouchableOpacity>));
    return menuItems;
  }

  render() {
    const sideMenuItems = this.renderMenuItems();

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(255, 193, 7, .8)' }}>
        <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
          { sideMenuItems }
        </View>
        <Text style={{ position: 'absolute', bottom: 40, left: 20, fontSize: 12 }}>v0.0.12</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: width * 0.8,
    height: width * 0.17,
    margin: 2.5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,.3)',
  },
});
