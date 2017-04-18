import React, { Component } from 'react';
import {
    Alert, View, Text, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
const { height, width } = Dimensions.get('window');


const CustomLayoutAnimation = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

export default class IndiGoal extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  deleteGoal() {
    const ref = this.props.Firebase.database().ref();
    const uid = this.props.Firebase.auth().currentUser.uid;
    const userGoalsRef = ref.child(`userReadable/userGoals/${uid}`);
    userGoalsRef.child(this.props.element.goalKey).remove();
    this.props.updateGoals();
  }

  render() {
    return (
      <View style={{ width: width * 0.9, height: width * 0.4, padding: 10, backgroundColor: 'black', borderWidth: 0.5, borderColor: 'black', borderRadius: 10, margin: 10 }}>
        <Text style={{ backgroundColor: 'transparent', textAlign: 'center', fontSize: 17, color: '#bdbdbd', fontFamily: 'OpenSans' }}>
          { this.props.element.goal }
        </Text>
        <TouchableOpacity style={{ position: 'absolute', right: 0 }} activeOpacity={0.7} onPress={this.deleteGoal.bind(this)}>
          <Icon name="trash" size={20} color="rgba(255,255,255,.3)" style={{ margin: 3, backgroundColor: 'transparent', overflow: 'hidden' }} />
        </TouchableOpacity>
        <View style={styles.goal} >
          <Progress.Bar
            color="#ffc107"
            height={2}
            progress={+this.props.element.progress / +this.props.element.amount}
            width={273}
            borderColor={'black'}
            unfilledColor={'#424242'}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#bdbdbd' }}>${this.props.element.progress}</Text>
          <Text style={{ color: '#bdbdbd' }}>${this.props.element.amount}</Text>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.7} onPress={this.props.toggleEditGoal}>
          <Icon name="plus-square-o" size={30} color="#ffc107" style={{ backgroundColor: 'transparent', overflow: 'hidden' }} />
          <Text style={{ color: 'white', fontSize: 10, fontFamily: 'OpenSans' }}>add to goal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#424242',
  },
  addExpense: {
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
  addExpenseButton: {
    height: 45,
    width: 200,
    backgroundColor: '#3949ab',
    borderRadius: 10,
    marginLeft: 55,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    borderColor: '#e0e0e0',
    marginTop: 2,

    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  goal: {
    height: 10,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
