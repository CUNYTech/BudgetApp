import React, { Component } from 'react';
import {
    Alert, View, Text, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      addGoalOffset: -300,
      goal: 'New Goal Title',
      amount: 0,
      saved: 0,
      goals: [],
      progress: 0,
      expenseTotal: 0,
      expenseTotalChange: '0',
      addExpenseOffest: -1000,
      addBudgetOffset: -200,
      budgetValue: 0,
      budgetValueChange: '0',
      budgetTracker: {
        margin: 0,
      },
    };
  }

  componentWillMount() {
    this.setBudget();
    this.setExpense();
  }
  componentDidMount() {
  }

  async setBudget() {
    try {
      const _this = this;
      const expenses = this.state.expenseTotal;
      const fixedBudget = this.state.budgetValue;
      const budgetTrackerWidth = 273;

      await this.props.Firebase.auth().currentUser;

      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      // const userBudgetRef = ref.child('userReadable/userBudget').child(uid);
      const userGoalsRef = ref.child(`userReadable/userGoals/${uid}`);

      userGoalsRef.child(this.props.element.goalKey).once('value').then((snap) => {
        const currentValue = snap.val().amount;
        return currentValue;
      }).then((value) => {
        if ((expenses / value) < 1) {
          _this.setState({
            budgetValue: value,
            budgetTracker: {
              margin: ((expenses / value) * budgetTrackerWidth),
            },
          });
        } else if (fixedBudget === 0) {
          Alert.alert('Please set a monthly budget.');
          _this.setState({
            budgetTracker: {
              margin: 0,
            },
          });
        } else {
          Alert.alert('Expenses exceed budget. Please set a new, higher monthly budget.');
          _this.setState({
            budgetTracker: {
              margin: (budgetTrackerWidth),
            },
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  _showAddGoal() {
    const offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addGoalOffset == -300) {
      this.setState({ addGoalOffset: offSet }); // Set to 0 for android
    } else {
      this.setState({
        addGoalOffset: -300,
        expenseTotalChange: 0,
      });
    }
  }

  async _updateBudget() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      const newBudgetValue = +this.state.budgetValueChange;
      const newBudgetTotal = +this.state.budgetValueChange + +this.state.budgetValue;

      const _this = this;
      const budgetTrackerWidth = 273;

      if (newBudgetValue > 0) {
        // let curentUser = this.props.Firebase.database().ref().child(uid);
        userBudgetRef.update({ budget: newBudgetTotal });
        userBudgetRef.once('value').then((snap) => {
          const updatedValue = snap.val().budget;
          return updatedValue;
        }).then((value) => {
          if ((_this.state.expenseTotal / value) < 1) {
            LayoutAnimation.configureNext(CustomLayoutAnimation);
            _this.setState({
              budgetValue: value,
              budgetTracker: {
                margin: ((_this.state.expenseTotal / value) * budgetTrackerWidth),
              },
            });
          } else {
            LayoutAnimation.configureNext(CustomLayoutAnimation);
            _this.setState({
              budgetValue: value,
              budgetTracker: {
                margin: 273,
              },
            });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
    this.showAddBudget();
  }

  async setExpense() {
    try {
      _this.setState({ progress: 0 });
      console.log(this.props.element.goalKey);
      const ref = this.props.Firebase.database().ref();
      const uid = this.props.Firebase.auth().currentUser.uid;
      const userGoalsRef = ref.child(`userReadable/userGoals/${uid}`);
      const _this = this;

      // const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);
      // const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      await userGoalsRef.child(this.props.element.goalKey).once('value').then((snap) => {
        const updatedValue = snap.val().amount;
        return updatedValue;
      }).then((updatedValue) => {
        _this.setState({
          budgetValue: updatedValue,
        });
      });

      const fixedBudget = this.state.budgetValue;
      const budgetTrackerWidth = 273;

      userGoalsRef.child(this.props.element.goalKey).once('value').then((snap) => {
        const currentValue = snap.val().progress;
        _this.setState({ progress: currentValue });
        return currentValue;
      }).then((currentValue) => {
        if (((currentValue / fixedBudget) < 1) && (fixedBudget != 0) && (currentValue != 0)) {
          _this.setState({
            progress: currentValue,
            budgetTracker: {
              margin: ((currentValue / fixedBudget) * budgetTrackerWidth),
            },
          });
        } else if (fixedBudget === 0) {
          _this.setState({
            budgetTracker: {
              margin: 0,
            },
          });
        } else {
          _this.setState({
            expenseTotal: currentValue,
            budgetTracker: {
              margin: (budgetTrackerWidth),
            },
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }


  async _updateExpenses() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const _this = this;
      // const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);
      const userGoalsProgressRef = ref.child(`userReadable/userGoals/${uid}/`);

      const newExpenseValue = +this.state.expenseTotalChange;
      const newExpensesTotal = +this.state.expenseTotalChange + +this.state.expenseTotal;

      const budgetTrackerWidth = 273;
      const fixedBudget = _this.state.budgetValue;

      this.setState({ progress: newExpensesTotal });
      if (newExpenseValue > 0) {
        console.log(this.props.element.goalKey);
      // let curentUser = this.props.Firebase.database().ref().child(uid);
        userGoalsProgressRef.child(this.props.element.goalKey).update({ progress: `${newExpensesTotal}` });

        userGoalsProfressRef.once('value').then((snap) => {
          const updatedValue = snap.val().progress;
          return updatedValue;
        }).then((value) => {
          if (((value / fixedBudget) < 1) && (fixedBudget != 0)) {
            LayoutAnimation.configureNext(CustomLayoutAnimation);
            _this.setState({
              expenseTotal: value,
              budgetTracker: {
                margin: ((value / fixedBudget) * budgetTrackerWidth),
              },
            });
          } else if (fixedBudget === 0) {
            _this.setState({
              budgetTracker: {
                margin: 0,
              },
            });
          } else {
            LayoutAnimation.configureNext(CustomLayoutAnimation);
            _this.setState({
              expenseTotal: value,
              budgetTracker: {
                margin: 273,
              },
            });
          }
        });
      }
      this.showAddExpense();
    } catch (e) {
      console.log(e);
    }
  }

  showAddExpense() {
    const offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addExpenseOffest === -200) {
      this.setState({ addExpenseOffest: offSet }); // Set to 0 for android
    } else {
      this.setState({
        addExpenseOffest: -200,
        expenseTotalChange: 0,
      });
    }
  }

  showAddBudget() {
    const ref = this.props.Firebase.database().ref();
    const uid = this.props.Firebase.auth().currentUser.uid;
    const userGoalsRef = ref.child(`userReadable/userGoals/${uid}`);
    userGoalsRef.child(this.props.element.goalKey).remove();
    const offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addBudgetOffset === -200) {
      this.setState({ addBudgetOffset: offSet }); // Set to 0 for android
    } else {
      this.setState({
        addBudgetOffset: -200,
        budgetValueChange: 0,
      });
    }
    this.props.updateGoals();
  }

  handlePress() {
    Actions.budget();
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ backgroundColor: 'transparent', width, textAlign: 'center', fontSize: 15, color: '#424242' }}>
          { this.props.element.goal }
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', right: 10 }}>
          <TouchableOpacity activeOpacity={0.7} onPress={this.showAddBudget.bind(this)}>
            <Icon name="remove" size={27} color="#0d47a1" style={{ margin: 3, backgroundColor: 'white', overflow: 'hidden', borderRadius: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={this.showAddExpense.bind(this)}>
            <Icon name="pencil" size={27} color="#0d47a1" style={{ margin: 3, backgroundColor: 'white', overflow: 'hidden', borderRadius: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.goal} >
          <View style={{ flex: 1, backgroundColor: '#0d47a1', width: 273 * (+this.state.progress / +this.props.element.amount) }} />
        </View>
        <Text style={{ flexDirection: 'row', textAlign: 'right', right: 20 }}>
        ${this.props.element.amount}  ${this.state.progress}
        </Text>
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
          ADD AN EXPENSE
        </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20 }}>
            <Text style={{ color: 'white', fontSize: 35 }}>
            $
          </Text>
            <TextInput
              style={{ height: 40, width: 100, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center' }}
              onChangeText={expenseTotalChange => this.setState({ expenseTotalChange })}
              value={`${this.state.expenseTotalChange}`}
            />
          </View>
          <TouchableOpacity
            onPress={this._updateExpenses.bind(this)}
            style={styles.addExpenseButton}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
            ADD
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
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 0,
    backgroundColor: 'white',
  },
});
