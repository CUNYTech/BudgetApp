/*// THIS IS THE FIRST FILE OF OUR APP.
// THIS IS HOW NAVIGATION WILL WORK
// THE NAVIGATOR IS A REACT NATIVE COMPONENT AND WE NEED TO IMPORT IT TO USE IT (LINE 6-8)

import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

// WE NEED TO IMPORT EVERY COMPONENT WE WANT TO USE HERE
import Page1 from './components/wellingtonPages/page1'
import Page2 from './components/wellingtonPages/page2'
import Page3 from './components/wellingtonPages/page3'
import Page4 from './components/wellingtonPages/page4'


export default class Main extends Component {
  // THIS constructor FUNCTION RUNS AUTOMATICALLY WHEN APP IT OPENED
  constructor() {
    super();
    this.renderScene = this.renderScene.bind(this)
  }
  // THIS IS HOW NAVIGATION WILL WORK. WE ARE PASSING THE navigator TO EACH SCENE LIKE A VARIABLE. THIS renderScene function RUNS WHEN IT IS CALLED ON LINE 56
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
  // THIS IS HOW WE CONTROL PAGE TRANSITIONS. RIGHT NOW, THEY ARE ALL SET TO FloatFromRight
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
  // UI EXISTS INSIDE THE render FUNCTION.
  // LINE 55 IS ASIGNING THE FIRST PAGE TO DISPLAY.
  // EVERY TIME WE CHANGE PAGES, WE COME BACK TO THIS COMPONENT AND renderScene RUNS AGAIN
  // LINE 56 IS CALLING THE renderScene FUNCTION ON LINE 24
  // LINE 57 IS CALLING THE configureScene FUNCTION ON LINE 36
  render() {
    return (
      <Navigator
        initialRoute = {{name: 'page1'}}
        renderScene = {this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}*/
