import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,
    LayoutAnimation, Platform, Dimensions, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { BackgroundWrapper } from '../components';
import { getPlatformValue } from '../utils';
import IndiGoal from '../components/goalHelpers/indiGoal.js';
//
import Icon from 'react-native-vector-icons/FontAwesome';

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

export default class Goals extends Component {

  constructor() {
    super();
    this.state = {
      addGoalOffset: -height,
      addExpenseOffest: height,
      goal: '',
      amount: '',
      saved: 0,
      goals: [],
      activeGoalKey: '',
      activeGoalAmount: '',
      activeGoalTitle: '',
      newProgressChange: '',
      errors: 'transparent',
    };
  }

  componentDidMount() {
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

  _addGoal() {
    if (!Number.isInteger(+this.state.amount) || +this.state.amount <= 0 || this.state.goal === '') {
      this.setState({
        errors: 'red',
      });
      return;
    }
    const ref = this.props.Firebase.database().ref();
    const userGoalsRef = ref.child('userReadable/userGoals');
    const user = this.props.Firebase.auth().currentUser;
    const userGoal = this.state.goal;
    const amount = this.state.amount;
    const uid = this.props.Firebase.auth().currentUser.uid;

    userGoalsRef.child(uid).push({
      goal: userGoal,
      amount,
      progress: 0,
    }).then((snap) => {
      userGoalsRef.child(`${uid}/${snap.key}`).update({
        goalKey: snap.key,
      });
    });
    this._showAddGoal();
    this._setGoals();
  }

  async _editGoals() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const _this = this;
      // const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);
      const userGoalsProgressRef = ref.child(`userReadable/userGoals/${uid}/`);

      const newProgressChange = +this.state.newProgressChange;
      const newProgressTotal = +this.state.newProgressChange + +this.state.activeGoalProgress;

      this.setState({ progress: newProgressTotal });
      if (newProgressTotal > 0) {
        userGoalsProgressRef.child(this.state.activeGoalKey).update({ progress: `${newProgressTotal}` });
        userGoalsProgressRef.once('value').then((snap) => {
          const updatedValue = snap.val().progress;
          return updatedValue;
        }).then((value) => {
          this.setState({ progress: value });
        });
      }
    } catch (e) {
    }
    this._setGoals();
    this.toggleEditGoal();
  }

  _showAddGoal() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    dismissKeyboard();
    if (this.state.addGoalOffset === -height) {
      this.setState({
        addGoalOffset: 0,
        expenseTotalChange: '',
        activeGoalKey: '',
        activeGoalAmount: '',
        activeGoalTitle: '',
        activeGoalProgress: '',
        errors: 'transparent',
        goal: '',
        amount: '',
      }); // Set to 0 for android
    } else {
      this.setState({
        addGoalOffset: -height,
        errors: 'transparent',
        goal: '',
        amount: '',
      });
    }
  }


  handleChangeInput(stateName, text) {
    this.setState({
      [stateName]: text,
    });
  }

  render() {
    let i = 1;
    const goals = [];
    let completed = 0;
    let inProgess = 0;


    this.state.goals.forEach((element) => {
      goals.push(
        <IndiGoal key={i} updateGoals={this._setGoals.bind(this)} element={element} Firebase={this.props.Firebase} />,
     );
      if (+element.progress < +element.amount) {
        inProgess += 1;
      } else {
        completed += 1;
      }
      i += 1;
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon
              name="bars"
              size={30}
              color="white"
              onPress={this.props.sideMenu}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              width: 250,
              color: 'white',
              fontWeight: '300',
              marginBottom: 5,
            }}
          >
                GOALS
              </Text>
          <Icon name="diamond" size={20} color="#ffc107" />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#424242', borderBottomWidth: 0.5, borderColor: theme.accent, padding: 5 }}>
          <View style={{ width: width * 0.3, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', color: theme.accent, fontSize: 50, fontWeight: '100' }}>
              {goals.length}
            </Text>
            <Text style={{ fontSize: 15, fontFamily: 'OpenSans', color: 'white', textAlign: 'center' }}>
              Total{'\n'} Goals
            </Text>
          </View>
          <View style={{ justifyContent: 'center', width: width * 0.3, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: theme.accent, fontSize: 50, fontWeight: '100' }}>
              {inProgess}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: 'OpenSans', color: 'white' }}>
                Goals{'\n'} In Progress
              </Text>
          </View>
          <View style={{ justifyContent: 'center', width: width * 0.3, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: theme.accent, fontSize: 50, fontWeight: '100' }}>
              {completed}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: 'OpenSans', color: 'white' }}>
              Goals{'\n'} Completed
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.section}>
          { goals }
        </ScrollView>
        <TouchableOpacity style={styles.addExpense} activeOpacity={0.7} onPress={this._showAddGoal.bind(this)}>
          <Icon name="plus-circle" size={50} color="#ffc107" style={{ backgroundColor: 'transparent', overflow: 'hidden', borderRadius: 20 }} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: this.state.addGoalOffset,
            width,
            height: height * 0.92,
            backgroundColor: 'rgba(0,0,0,.7)',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 150,
          }}
        >
          <TouchableOpacity onPress={this._showAddGoal.bind(this)} style={{ position: 'absolute', top: 10, right: 10 }}>
            <Text style={{ color: 'white', fontFamily: 'OpenSans' }}>Cancel</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'OpenSans', alignSelf: 'center', marginBottom: 20 }}>
            ADD NEW GOAL
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: width * 0.2 }}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: 'white', fontSize: 22 }}>
                Goal
              </Text>
              <TextInput
                style={{ height: 40, width: 200, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center' }}
                placeholder="New Goal"
                onChangeText={this.handleChangeInput.bind(this, 'goal')}
                value={this.state.goal}
              />
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 25 }}>
                $
              </Text>
              <TextInput
                keyboardType="numeric"
                style={{ height: 40, width: 200, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center' }}
                onChangeText={this.handleChangeInput.bind(this, 'amount')}
                value={this.state.amount}
              />
            </View>
            <TouchableOpacity
              onPress={this._addGoal.bind(this)}
              style={styles.addExpenseButton}
            >
              <Text style={{ textAlign: 'center', color: 'white' }}>
                  ADD
                </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ position: 'absolute', top: 180, left: 30, fontSize: 12, fontFamily: 'OpenSans', color: this.state.errors }}>Invalid goal or value</Text>
        </View>
      </View>
    );
  }
     }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  header: {
    paddingTop: getPlatformValue('android', 25, 20),
    flex: 0,
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#424242',
  },
  addExpense: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  addExpenseButton: {
    height: 45,
    width: 200,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.accent,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  section: {
    flex: 0,
    borderColor: '#e0e0e0',
    marginTop: 2,
    backgroundColor: '#212121',
    alignItems: 'center',
  },
  goal: {
    height: 20,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 0,
    backgroundColor: 'white',
  },
});
