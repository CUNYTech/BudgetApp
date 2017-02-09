
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

  navigate() {
    this.props.navigator.push({
      name: 'page2'
    })
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.navigate.bind(this)}>
        <Text>PAGE 1 - Press Me!</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    }
});
