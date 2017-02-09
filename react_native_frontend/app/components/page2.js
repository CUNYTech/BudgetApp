
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';


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
// THIS IS HOW YOU GO BACK A PAGE. THE pop METHOD BEING CALLED REMOVES THE LAST ITEM THAT WAS pushed INTO THE ARRAY.
// [1, 2, 3, 4].pop() WOULD LEAVE US WITH [1, 2, 3] SO PAGE 3 WOULD THEN DISPLAY
  back() {
    this.props.navigator.pop()
  }
// A RULE OF REACT-NATIVE IS THAT THE UI NEEDS TO WRAPPED INSIDE A TAG. NOTICE HOW EVERYTHING IS INSIDE THE View TAG. (LINE 32-40)
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
