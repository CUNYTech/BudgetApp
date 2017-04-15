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
    console.log('element', this.props.element);
    console.log('goal in indi', this.props.element.goalKey);
    return (
      <View style={{ padding: 10, backgroundColor: 'black', borderBottomWidth: 0.5, borderTopWidth: 0, borderColor: '#ffc107' }}>
        <Text style={{ backgroundColor: 'transparent', width, textAlign: 'center', fontSize: 15, color: '#bdbdbd' }}>
          { this.props.element.goal }
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', right: 10 }}>
          <TouchableOpacity activeOpacity={0.7} onPress={this.deleteGoal.bind(this)}>
            <Icon name="remove" size={27} color="#bdbdbd" style={{ margin: 3, backgroundColor: 'transparent', overflow: 'hidden', borderRadius: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={this.props.toggleEditGoal}>
            <Icon name="pencil" size={27} color="#ffc107" style={{ margin: 3, backgroundColor: 'transparent', overflow: 'hidden', borderRadius: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.goal} >
          <Progress.Bar
            color="#ffc107"
            height={1}
            progress={+this.props.element.progress / +this.props.element.amount}
            width={273}
            borderColor={'black'}
            unfilledColor={'#424242'}
          />
        </View>
        <Text style={{ flexDirection: 'row', textAlign: 'right', right: 20, color: '#bdbdbd' }}>
         ${this.props.element.progress} ${this.props.element.amount}
        </Text>
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
    height: 20,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
