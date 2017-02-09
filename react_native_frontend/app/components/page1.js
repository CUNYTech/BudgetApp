// UNLIKE HTML, WE CAN ONLY USE SPECIFIC TAGS IN REACT-NATIVE
// WE NEED TO IMPORT THE TAGS WE WILL BE USING FROM REACT-NATIVE FOR THE UI (LINES 4-9)
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Page1 extends Component {

  constructor() {
    super();

    this.navigate = this.navigate.bind(this)
  }
// THIS FUNCTION IS HOW WE GO TO THE NEXT PAGE. THE navigator IS ESSENTIALLY AN ARRAY OF PAGES. WE push IN THE PAGE WE WANT TO SEE
  navigate() {
    this.props.navigator.push({
      name: 'page2'
    })
  }
// ON LINE 27 WE ARE ADDING AN EVENT LISTENER. onPress MEANS WHEN THIS ELEMENT IS PRESSED THE navigate FUNCTION ON LINE 19 RUNS
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.navigate.bind(this)}>
        <Text>PAGE 1 - Press Me!</Text>
      </TouchableOpacity>
    );
  }
}
// THIS IS HOW WE STYLE THE UI. ALL STYLING IS CONTAINED IN OBJECTS WHICH ARE THEN CALLED WHEN WE WANT TO USE THEM(LINE 27)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    }
});
