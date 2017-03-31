import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';
import Expenses from '../components/budgetSections/expenses.js';
import Savings from '../components/budgetSections/savings.js';
import BudgetSection from '../components/budgetSections/budget.js';

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

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

export default class Budget extends Component {

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
          BUDGET
        </Text>
          <Icon name="diamond" size={20} color={theme.accent} />
        </View>
        <View style={{ backgroundColor: theme.bg }}>
          <BudgetSection Firebase={this.props.Firebase} />
          <Savings Firebase={this.props.Firebase} />
          <Expenses Firebase={this.props.Firebase} />
        </View>
      </View>
    );
  }
 }


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    paddingTop: getPlatformValue('android', 25, 20),
    flex: 0,
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: theme.bg,
  },
});
