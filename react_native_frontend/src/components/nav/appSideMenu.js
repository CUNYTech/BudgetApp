import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


export default class AppSideMenu extends Component {

  handleNavPress(action) {
    action();
    this.props.toggleSideMenu();
  }

  renderMenuItems() {
    const menuDesc = [
      { id: 1, title: 'Dashboard', icon: 'apps', nav: this.handleNavPress.bind(this, Actions.dashboard) },
      { id: 2, title: 'Daily Points', icon: 'timeline', nav: this.handleNavPress.bind(this, Actions.points) },
      { id: 3, title: 'Friends', icon: 'people', nav: this.handleNavPress.bind(this, Actions.friends) },
      { id: 4, title: 'Goals', icon: 'stars', nav: this.handleNavPress.bind(this, Actions.goals) },
      { id: 5, title: 'Budget', icon: 'insert-chart', nav: this.handleNavPress.bind(this, Actions.budget) },
      { id: 6, title: 'Profile', icon: 'account-circle', nav: this.handleNavPress.bind(this, Actions.profile) },
      { id: 7, title: 'Settings', icon: 'settings', nav: this.handleNavPress.bind(this, Actions.settings) },
      { id: 8, title: 'Logout', icon: 'close', nav: this.handleNavPress.bind(this, Actions.home) },
    ];

    const menuItems = menuDesc.map(item => (
      <TouchableOpacity key={item.id} onPress={item.nav}>
        <ListItem
          title={item.title}
          leftIcon={{ name: item.icon }}
        />
      </TouchableOpacity>));
    return menuItems;
  }

  render() {
    const sideMenuItems = this.renderMenuItems();

    return (
      <List>
        { sideMenuItems }
      </List>
    );
  }
}
