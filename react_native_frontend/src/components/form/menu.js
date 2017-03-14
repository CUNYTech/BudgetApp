import {SideMenu, List, ListItem} from 'react-native-elements'
import Icon from 'native-base';
import React, {Component, PropTypes} from 'react';

export default class Menu extends Component {

constructor () {
  super()
  this.state = {
    isOpen: false
  }
  this.toggleSideMenu = this.toggleSideMenu.bind(this)
}

toggleSideMenu () {
  this.setState({
    isOpen: !this.state.isOpen
  })
}

  render() {
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
    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: 'ededed', paddingTop: 50}}>

        <List>
        {
          list.map((item, i) =>
            <ListItem
            key={i}
            title={item.title}
            leftIcon={{name: item.icon}}
            onPressIcon={item.onPress}
            />
          )
        }
        </List>
      </View>
    )

    return (
      <SideMenu
        isOpen={this.state.isOpen}
        menu={MenuComponent}>
        <App toggleSideMenu={this.toggleSideMenu.bind(this)} />
      </SideMenu>
    )}
  }
