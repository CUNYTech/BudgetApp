import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Goals } from '../../pages/goals.js';
import IndiGoal from '../goalHelpers/indiGoal.js';
import * as Progress from 'react-native-progress';

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

const { height, width } = Dimensions.get('window');


export default class GoalsSnapshot extends Component {

  constructor() {
    super();
    this.state = { goal: '',
      amount: 0,
      goals: [],
    };
  }

  componentWillMount() {
    this._setGoals();
  }

  _setGoals() {
    const _this = this;
    const userGoals = [];
    const ref = _this.props.Firebase.database().ref();
    const uid = _this.props.Firebase.auth().currentUser.uid;

    const userGoalsRef = ref.child('userReadable/userGoals');
    userGoalsRef.child(uid).orderByKey().once('value').then((snap) => {
      snap.forEach((snapshot) => {
        userGoals.push({ goalKey: snapshot.val().goalKey, goal: snapshot.val().goal, amount: snapshot.val().amount, progress: snapshot.val().progress });
      });
      return Promise.all(userGoals);
    }).then((userGoals) => {
      _this.setState({
        goals: userGoals,
      });
    });
  }

  handlePress() {
    Actions.goals();
  }

  render() {
    let i = 1;
    const goals = [];

    this.state.goals.forEach((element) => {
      goals.push(
        <View key={i} style={{ marginTop: 5 }}>
          <Text style={styles.goalText}>
            { element.goal }
          </Text>
          <View style={styles.goal} >
            <Progress.Bar
              color={theme.accent}
              height={2}
              progress={element.progress / element.amount}
              width={width * 0.9}
              borderWidth={0}
              unfilledColor="rgba(255,255,255,.5)"
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, alignSelf: 'center' }}>
            <Text style={{ fontSize: 12, fontFamily: 'OpenSans', padding: 0, margin: -10, color: 'white' }}>{element.progress}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'OpenSans', padding: 0, margin: -10, color: 'white' }}>{element.amount}</Text>
          </View>
        </View>,
        );
      i += 1;
    });
    // }

    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress.bind(this)}>
        <Text style={styles.headerText}>
          GOALS
        </Text>
        <ScrollView contentContainerStyle={styles.section}>
          { goals }
        </ScrollView>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#424242',
    borderTopWidth: 1,
    backgroundColor: 'black',
  },
  section: {
    flex: 1,
    borderColor: '#424242',
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
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontFamily: 'OpenSans',
  },
  headerText: {
    marginTop: 10,
    marginLeft: 6,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#bdbdbd',
    marginBottom: 10,
  },
});
