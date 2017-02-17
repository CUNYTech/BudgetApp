
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Page3 extends Component {

  constructor() {
    super();

    this.navigate = this.navigate.bind(this)
  }

  navigate() {
    this.props.navigator.push({
      name: 'page4'
    })
  }

  back() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity  onPress={this.navigate.bind(this)}>
          <Text>PAGE 3 - Press Me!</Text>
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
    backgroundColor: 'green',
    }
});
