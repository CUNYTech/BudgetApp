

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';


export default class BackButton extends Component {

  constructor() {
    super();

    this.navigate = this.navigate.bind(this)
  }

  navigate() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <TouchableOpacity style={styles.backButton} onPress={this.navigate.bind(this)}>
        <Text>BACK</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    }
});
