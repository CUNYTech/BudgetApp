import React, { Component } from 'react';
import {
    Alert, View, Text, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import dismissKeyboard from 'react-native-dismiss-keyboard';
const { height, width } = Dimensions.get('window');


const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

export default class IndiGoal extends Component {

  constructor() {
    super();
    this.state = {
      newProgressChange: '',
      modalOffset: width * 0.5,
      errors: 'transparent',
    };
  }

  async _editGoals() {
    if (!Number.isInteger(+this.state.newProgressChange)) {
      this.setState({
        errors: 'red',
      });
      return;
    }
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const _this = this;
      // const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);
      const userGoalsProgressRef = ref.child(`userReadable/userGoals/${uid}/`);

      const newProgressChange = +this.state.newProgressChange;
      const newProgressTotal = +this.state.newProgressChange + +this.props.element.progress;

      this.setState({ progress: newProgressTotal });
      if (newProgressTotal > 0) {
        userGoalsProgressRef.child(this.props.element.goalKey).update({ progress: `${newProgressTotal}` });
        userGoalsProgressRef.once('value').then((snap) => {
          const updatedValue = snap.val().progress;
          return updatedValue;
        }).then((value) => {
          this.setState({ progress: value });
        });
      }
    } catch (e) {
    }
    this.props.updateGoals();
    this.toggleEditGoal();
  }

  deleteGoal() {
    const ref = this.props.Firebase.database().ref();
    const uid = this.props.Firebase.auth().currentUser.uid;
    const userGoalsRef = ref.child(`userReadable/userGoals/${uid}`);
    userGoalsRef.child(this.props.element.goalKey).remove();
    this.props.updateGoals();
  }

  toggleEditGoal() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    dismissKeyboard();
    if (this.state.modalOffset === 0) {
      this.setState({
        modalOffset: width * 0.5,
        errors: 'transparent',
      });
    } else {
      this.setState({
        modalOffset: 0,
        errors: 'transparent',
      });
    }
  }

  render() {
    return (
      <View style={{ width: width * 0.9, height: width * 0.4, padding: 10, backgroundColor: 'black', borderWidth: 0.5, borderColor: 'black', borderRadius: 10, margin: 10, overflow: 'hidden' }}>
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
        <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.7} onPress={this.toggleEditGoal.bind(this)}>
          <Icon name="plus-square-o" size={30} color="#ffc107" style={{ backgroundColor: 'transparent', overflow: 'hidden' }} />
          <Text style={{ color: 'white', fontSize: 10, fontFamily: 'OpenSans' }}>add to goal</Text>
        </TouchableOpacity>
        <View style={[styles.modal, { top: this.state.modalOffset }]}>
          <View style={{ justifyContent: 'center', paddingBottom: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 15, fontFamily: 'OpenSans', padding: 10 }}>
            Add to goal
          </Text>
            <TextInput
              keyboardType="numeric"
              style={{ height: 40, width: 100, backgroundColor: 'rgba(255,255,255,.6)', borderWidth: 1, textAlign: 'center' }}
              placeholder="$"
              onChangeText={newProgressChange => this.setState({ newProgressChange })}
              value={this.state.newProgressChange}
            />
          </View>
          <TouchableOpacity
            onPress={this._editGoals.bind(this)}
            style={styles.addExpenseButton}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'OpenSans', fontSize: 12 }}>
            UPDATE
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleEditGoal.bind(this)} style={{ position: 'absolute', top: 10, right: 10 }}>
            <Text style={{ fontFamily: 'OpenSans', fontSize: 12, color: 'white' }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={{ position: 'absolute', top: 10, left: 10, fontFamily: 'OpenSans', fontSize: 12, color: this.state.errors }}>
            invalid input
          </Text>
        </View>
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
    padding: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.accent,
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
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
