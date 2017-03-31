import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Goals } from '../../pages/goals.js';
import * as Progress from 'react-native-progress';

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};


export default class GoalsSnapshot extends Component {

  constructor() {
    super();
    this.state = { goal: '',
      amount: 0,
      goals: [],
    };
  }

  handlePress() {
    Actions.goals();
  }

  render() {
    let i = 1;
    const goals = [];
    const myGoals = ['Paris Trip', "Yeezy's", "Mac 'n' Cheese"];
    myGoals.forEach((element) => {
      goals.push(
        <View key={i} style={{ marginTop: 5 }}>
          <Text style={styles.goalText}>
            { element }
          </Text>
          <View style={styles.goal} >
            <Progress.Bar
              color={theme.accent}
              height={1}
              progress={100 / 335}
              width={335}
              borderWidth={0}
              unfilledColor="rgba(255,255,255,.5)"
            />
          </View>
        </View>,
      );
      i += 1;
    });
    return (
      <TouchableOpacity style={styles.section} onPress={this.handlePress.bind(this)}>
        <Text style={styles.headerText}>
          GOALS
        </Text>
        { goals }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    borderColor: '#424242',
    borderBottomWidth: 1,
    backgroundColor: 'black',
  },
  goal: {
    height: 20,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  goalText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 335,
    textAlign: 'center',
    fontSize: 15,
    color: '#424242',
  },
  headerText: {
    marginLeft: 6,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#bdbdbd',
    marginBottom: 10,
  },
});
