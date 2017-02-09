
import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';


import Page1 from './components/page1'
import Page2 from './components/page2'
import Page3 from './components/page3'
import Page4 from './components/page4'


export default class Main extends Component {

  constructor() {
    super();
    this.renderScene = this.renderScene.bind(this)
  }

  renderScene(route, navigator) {
    if(route.name === 'page1') {
      return <Page1 navigator={navigator} />
    } else if (route.name === 'page2') {
      return <Page2 navigator={navigator} />
    } else if (route.name === 'page3') {
      return <Page3 navigator={navigator} />
    } else if (route.name === 'page4') {
      return <Page4 navigator={navigator} />
    }
  }

  configureScene(route) {
    if(route.name === 'page1') {
      return Navigator.SceneConfigs.FloatFromRight
    } else if (route.name === 'page2') {
      return Navigator.SceneConfigs.FloatFromRight
    } else if (route.name === 'page3') {
      return Navigator.SceneConfigs.FloatFromRight
    } else if (route.name === 'page4') {
      return Navigator.SceneConfigs.FloatFromRight
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {{name: 'page1'}}
        renderScene = {this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}
