
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import BackButton from './backButton'

export default class Page2 extends Component {

  constructor() {
    super();

    this.navigate = this.navigate.bind(this)
  }

  navigate() {
    this.props.navigator.push({
      name: 'page3'
    })
  }

  back() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity  onPress={this.navigate.bind(this)}>
          <Text>PAGE 2 - Press Me!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.back.bind(this)}>
          <Text>BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    }
});
