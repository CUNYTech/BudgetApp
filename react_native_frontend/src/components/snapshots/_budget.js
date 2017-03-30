import React, { Component } from 'react';
import {
    Alert, View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, Platform } from 'react-native';
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

export default class BudgetSnapshot extends Component {

  constructor() {
    super();
    this.state = {
      expenseTotal: 0,
      expenseTotalChange: '0',
      addExpenseOffest: -200,
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

  async setBudget() {
    try {
      const _this = this;
      const expenses = this.state.expenseTotal;
      const fixedBudget = this.state.budgetValue;
      const budgetTrackerWidth = 273;

      await this.props.Firebase.auth().currentUser;

      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      userBudgetRef.once('value').then((snap) => {
        const currentValue = snap.val().budget;
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
      console.log(error);
    }
  }

  async _updateBudget() {
    const userGoalsRef = ref.child(`userReadable/userGoals/${uid}`);
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
      const _this = this;
      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);
      const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      await userBudgetRef.once('value').then((snap) => {
        const updatedValue = snap.val().budget;
        return updatedValue;
      }).then((updatedValue) => {
        _this.setState({
          budgetValue: updatedValue,
        });
      });

      const fixedBudget = this.state.budgetValue;
      const budgetTrackerWidth = 273;

      userTotalExpensesRef.once('value').then((snap) => {
        const currentValue = snap.val().expenses;
        return currentValue;
      }).then((currentValue) => {
        if (((currentValue / fixedBudget) < 1) && (fixedBudget != 0)) {
          _this.setState({
            expenseTotal: currentValue,
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
      console.log(error);
    }
  }

  async _updateExpenses() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;

      const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);

      const newExpenseValue = +this.state.expenseTotalChange;
      const newExpensesTotal = +this.state.expenseTotalChange + +this.state.expenseTotal;
      const _this = this;
      const budgetTrackerWidth = 273;
      const fixedBudget = _this.state.budgetValue;

      if (newExpenseValue > 0) {
      // let curentUser = this.props.Firebase.database().ref().child(uid);
        userTotalExpensesRef.update({ expenses: newExpensesTotal });
        userTotalExpensesRef.once('value').then((snap) => {
          const updatedValue = snap.val().expenses;
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
  }

  handlePress() {
    Actions.budget();
  }

  render() {
    return (
      <TouchableOpacity style={styles.budgetSection} onPress={this.handlePress.bind(this)}>
        <Text style={{ marginLeft: 6, fontFamily: 'OpenSans', fontSize: 17, color: '#212121' }}>
        BUDGET
      </Text>
        <View style={{ backgroundColor: 'white', height: 16, marginRight: 80, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#e0e0e0' }}>
          <View style={{ flex: 1, backgroundColor: '#0d47a1', width: this.state.budgetTracker.margin }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 60, paddingTop: 5 }}>
          <Text style={{ color: '#212121', marginLeft: this.state.budgetTracker.margin }}>
          ${ this.state.expenseTotal }
          </Text>
          <Text style={{ right: 20, color: '#212121' }}>
          ${ this.state.budgetValue }
          </Text>
        </View>
        <TouchableOpacity style={styles.addExpense} activeOpacity={0.7} onPress={this.showAddExpense.bind(this)}>
          <Icon name="plus-circle" size={50} color="#0d47a1" style={{ bottom: 0, backgroundColor: 'white' }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', bottom: 3 }} activeOpacity={0.7} onPress={this.showAddBudget.bind(this)}>
          <Icon name="pie-chart" size={40} color="#0d47a1" style={{ backgroundColor: 'transparent', marginLeft: 10 }} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: this.state.addBudgetOffset,
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
          <Text style={{ textAlign: 'center', color: 'white' }}>
          ADD A MONTHLY BUDGET
        </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20, width }}>
            <Text style={{ color: 'white', fontSize: 35 }}>
            $
          </Text>
            <TextInput
              style={{ height: 40, width: 100, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center' }}
              onChangeText={budgetValueChange => this.setState({ budgetValueChange })}
              value={`${this.state.budgetValueChange}`}
            />
          </View>
          <TouchableOpacity
            onPress={this._updateBudget.bind(this)}
            style={styles.addExpenseButton}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
            SET
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
          <Text style={{ textAlign: 'center', color: '#212121' }}>
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
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  budgetSection: {
    flex: 0,
    borderColor: '#212121',
    marginTop: 2,
    paddingBottom: 10,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  addExpense: {
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
  addExpenseButton: {
    height: 45,
    width: 200,
    backgroundColor: '#086788',
    borderRadius: 10,
    marginLeft: 55,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});
