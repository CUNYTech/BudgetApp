import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,
    LayoutAnimation, Platform, Dimensions, Alert, ScrollView } from 'react-native';
import { BackgroundWrapper } from '../components';
import { getPlatformValue } from '../utils';
import IndiGoal from '../components/goalHelpers/indiGoal.js';
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
      addGoalOffset: height,
      addExpenseOffest: -200,
      goal: '',
      amount: 0,
      saved: 0,
      goals: [],
      activeGoalKey: '',
      activeGoalAmount: '',
      activeGoalTitle: '',
      newProgressChange: '',
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
      console.log(snap.key);
      userGoalsRef.child(`${uid}/${snap.key}`).update({
        goalKey: snap.key,
      });
    });
    this._showAddGoal();
    this._setGoals();
  }

  async _editGoals() {
    console.log('inside edit', this.state.activeGoalKey);

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
      Alert.alert(e);
      console.log(e);
    }
    this._setGoals();
    this.toggleEditGoal();
  }

  _showAddGoal() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addGoalOffset === height) {
      this.setState({
        addGoalOffset: 0,
        addExpenseOffest: -200,
        expenseTotalChange: '',
        activeGoalKey: '',
        activeGoalAmount: '',
        activeGoalTitle: '',
        activeGoalProgress: '',
      }); // Set to 0 for android
    } else {
      this.setState({
        addGoalOffset: height,
        expenseTotalChange: 0,
      });
    }
  }


  handleChangeInput(stateName, text) {
    this.setState({
      [stateName]: text,
    });
  }

  toggleEditGoal(element) {
    const offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addExpenseOffest === -200) {
      this.setState({
        addExpenseOffest: offSet,
        activeGoalKey: element.goalKey,
        activeGoalAmount: element.amount,
        activeGoalTitle: element.goal,
        activeGoalProgress: element.progress,
        addGoalOffset: -300,
        expenseTotalChange: 0,
      }); // Set to 0 for android
    } else {
      this.setState({
        addExpenseOffest: -200,
        expenseTotalChange: '',
        activeGoalKey: '',
        activeGoalAmount: '',
        activeGoalTitle: '',
        activeGoalProgress: '',
      });
    }
  }

  render() {
    let i = 1;
    const goals = [];
    let completed = 0;
    let inProgess = 0;


    this.state.goals.forEach((element) => {
      goals.push(
        <IndiGoal key={i} updateGoals={this._setGoals.bind(this)} toggleEditGoal={this.toggleEditGoal.bind(this, element)} element={element} Firebase={this.props.Firebase} />,
     );
      if (element.progress >= element.amount) {
        completed += 1;
      } else {
        inProgess += 1;
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
          <View style={{ backgroundColor: 'black', borderRadius: 50, overflow: 'hidden', height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 17, fontFamily: 'OpenSans', color: 'white' }}>
              Total Goals
            </Text>
            <Text style={{ textAlign: 'center', color: theme.accent, fontSize: 22 }}>
              {goals.length}
            </Text>
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 15, fontFamily: 'OpenSans', color: '#e0e0e0' }}>
              Goals Completed
            </Text>
            <Text style={{ textAlign: 'center', color: theme.accent }}>
              {completed}
            </Text>
            <Text style={{ fontSize: 15, fontFamily: 'OpenSans', color: '#e0e0e0' }}>
              Goals In Progress
            </Text>
            <Text style={{ textAlign: 'center', color: theme.accent }}>
              {inProgess}
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
            top: this.state.addGoalOffset,
            width,
            height,
            left: 0,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: 'black',
            backgroundColor: 'rgba(0,0,0,.7)',
            justifyContent: 'center',
          }}
        >
          <Text style={{ bottom: 40, textAlign: 'center', color: '#424242' }}>
                ADD NEW GOAL
              </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontFamily: 'OpenSans', left: 120, color: 'white', fontSize: 25 }}>
                  $
                </Text>
            <TextInput
              style={{ left: 130, height: 40, width: 200, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center' }}
              onChangeText={this.handleChangeInput.bind(this, 'amount')}
              value={`${this.state.amount}`}
            />

            <TextInput
              style={{ bottom: 50, right: 70, height: 40, width: 200, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center' }}
              placeholder="New Goal"
              onChangeText={this.handleChangeInput.bind(this, 'goal')}
              value={`${this.state.goal}`}
            />
            <Text style={{ fontFamily: 'OpenSans', bottom: 45, left: -327, textAlign: 'left', color: 'white', fontSize: 22 }}>
                    Goal
                </Text>
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
        <View
          style={{
            position: 'absolute',
            bottom: this.state.addExpenseOffest,
            width: 300,
            height: 200,
            left: 35,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: 'black',
            backgroundColor: 'black',
            justifyContent: 'center',
          }}
        >
          <Text style={{ textAlign: 'center', color: '#424242' }}>
            { this.state.activeGoalTitle }
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20 }}>
            <Text style={{ color: 'white', fontSize: 35 }}>
            $
          </Text>
            <TextInput
              style={{ height: 40, width: 100, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center' }}
              placeholder="Add to Goal"
              onChangeText={newProgressChange => this.setState({ newProgressChange })}
              value={`${this.state.newProgressChange}`}
            />
          </View>
          <TouchableOpacity
            onPress={this._editGoals.bind(this)}
            style={styles.addExpenseButton}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
            UPDATE
          </Text>
          </TouchableOpacity>
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
    backgroundColor: '#3949ab',
    borderRadius: 10,
    marginLeft: 55,
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
