import React, { Component } from 'react';
import {
    Alert, Keyboard, View, Text, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { _updatePoints } from '../../utils/pointHelpers';
import dismissKeyboard from 'react-native-dismiss-keyboard';

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


export default class BudgetSnapshot extends Component {

  constructor() {
    super();
    this.state = {
      expenseModalOffset: -height,
      expenseTitleChange: '0',
      expenseValueChange: '',
      expenseTotal: 0,
      budgetValue: 0,
      error: 'transparent',
    };
  }

  componentWillMount() {
    this.setBudget();
    this.setExpense();
  }

  setProgess() {
    const { budgetValue, expenseTotal } = this.state;
    return (+expenseTotal / +budgetValue);
  }

  async setBudget() {
    try {
      const _this = this;
      const expenses = this.state.expenseTotal;
      const fixedBudget = this.state.budgetValue;

      await this.props.Firebase.auth().currentUser;

      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      userBudgetRef.once('value').then((snap) => {
        const currentValue = snap.val().budget;
        return currentValue;
      }).then((value) => {
        _this.setState({
          budgetValue: value,
        });
      });
    } catch (e) {
    }
  }

  async setExpense() {
    try {
      const _this = this;
      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);

      userTotalExpensesRef.once('value').then((snap) => {
        const currentValue = snap.val().expenses;
        return currentValue;
      }).then((currentValue) => {
        _this.setState({
          expenseTotal: currentValue,
        });
      });
    } catch (e) {
    }
  }

  async _updateExpenses() {
    if (!Number.isInteger(+this.state.expenseValueChange) || +this.state.expenseValueChange <= 0 || this.state.expenseTitleChange === '') {
      this.setState({
        error: 'red',
      });
      return;
    }
    try {
      const _this = this;
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);
      const newExpenseValue = +this.state.expenseValueChange;
      const newExpensesTotal = +newExpenseValue + +_this.state.expenseTotal;

      if (newExpenseValue > 0) {
        userTotalExpensesRef.update({ expenses: newExpensesTotal });
      }
      _this._addExpense();
      const event_2 = 2;
      _updatePoints(event_2, uid);
      this.setState({
        expenseTotal: newExpensesTotal,
        error: 'transparent',
      });
    } catch (e) {
    }
  }

  _addExpense() {
    const ref = this.props.Firebase.database().ref();
    const userExpenseRef = ref.child('userReadable/userExpenses');
    const userExpense = this.state.expenseTitleChange;
    const amount = this.state.expenseValueChange;
    const uid = this.props.Firebase.auth().currentUser.uid;

    userExpenseRef.child(uid).push({
      expense: userExpense,
      amount,
    }).then((snap) => {
      userExpenseRef.child(`${uid}/${snap.key}`).update({
        expenseKey: snap.key,
      });
    });
    this.toggleUpdateExpense();
  }

  handlePress() {
    Actions.budget();
  }

  toggleUpdateExpense() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    dismissKeyboard();
    if (this.state.expenseModalOffset === -height) {
      this.setState({
        expenseModalOffset: 0,
        expenseValueChange: '',
        expenseTitleChange: '',
      });
    } else {
      this.setState({
        expenseModalOffset: -height,
        expenseValueChange: '',
        expenseTitleChange: '',
      });
    }
  }

  render() {
    let progress = 0.01;
    if (this.setProgess() < 1) {
      progress = this.setProgess();
    } else if (this.setProgess() > 1) {
      progress = 1;
    }

    return (
      <View style={styles.budgetSection}>
        <TouchableOpacity onPress={this.handlePress.bind(this)}>
          <Text style={styles.titleText}>
          BUDGET
        </Text>
          <View style={styles.budgetSnap}>
            <Progress.Pie
              color={theme.accent}
              progress={progress}
              size={150}
              borderColor={theme.accent}
              unfilledColor={'black'}
            />
            <View
              style={{
                position: 'absolute',
                right: 55,
                top: 30,
                backgroundColor: 'transparent',
                width: 90,
                height: 90,
                borderRadius: 45,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  alignSelf: 'center',
                  fontSize: 17,
                  fontWeight: '600',
                  fontFamily: 'OpenSans',
                }}
              >
                ${ this.state.expenseTotal }  / {'\n'} ${ this.state.budgetValue }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addExpense} activeOpacity={0.7} onPress={this.toggleUpdateExpense.bind(this)}>
          <Text style={{ fontSize: 10, fontFamily: 'OpenSans', color: 'white' }}>Add Expense</Text>
          <Icon name="plus-circle" size={45} style={styles.iconStyle} />
        </TouchableOpacity>

        <View style={[styles.modal, { bottom: this.state.expenseModalOffset }]}>
          <Text style={{ color: '#bdbdbd', fontSize: 17, margin: 10, fontFamily: 'OpenSans', fontWeight: '100' }}>
              Add an Expense
            </Text>
          <View style={{ borderBottomWidth: 0.5, borderColor: theme.accent }}>
            <TextInput
              placeholder="Title"
              placeholderTextColor="rgba(255,255,255,.5)"
              style={{ width: 100, height: 40, alignSelf: 'center', color: 'white', fontSize: 15 }}
              onChangeText={expenseTitleChange => this.setState({ expenseTitleChange })}
              value={this.state.expenseTitleChange}
            />
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="$"
            placeholderTextColor="white"
            onSubmitEditing={Keyboard.dismiss}
            style={{ width: 100, height: 40, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,.1)', margin: 10, color: 'white' }}
            onChangeText={expenseValueChange => this.setState({ expenseValueChange })}
            value={this.state.expenseValueChange}
          />
          <TouchableOpacity
            style={{ backgroundColor: 'black', width: width * 0.5, padding: 10, margin: 10, borderRadius: 10, alignItems: 'center', borderColor: theme.accent, borderWidth: 0.5 }}
            onPress={this._updateExpenses.bind(this)}
          >
            <Text style={{ color: 'white', fontFamily: 'OpenSans' }}>
                Submit
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={this.toggleUpdateExpense.bind(this)}
          >
            <Text style={{ color: 'white', fontFamily: 'OpenSans' }}>
                Cancel
              </Text>
          </TouchableOpacity>
          <Text style={[styles.errors, { color: this.state.error }]}>
            invalid title or value
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  budgetSection: {
    width: width * 0.50,
    borderColor: '#424242',
    backgroundColor: 'black',
  },
  budgetSnap: {
    marginRight: 0,
    marginLeft: 0,
    marginTop: 20,
    alignItems: 'center',
  },
  emphasized: {
    color: 'white',
    fontSize: 35,
  },
  titleText: {
    textAlign: 'right',
    marginRight: 6,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#e0e0e0',
  },
  addExpense: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
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
  modalHeader: {
    textAlign: 'center',
    color: 'white',
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  modalInput: {
    height: 40,
    width: 100,
    borderColor: '#e0e0e0',
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    textAlign: 'center',
  },
  iconStyle: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    color: '#ffffff',
  },
  modalBody: {
    position: 'absolute',
    width: 300,
    height: 200,
    left: 35,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: null,
    height: null,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  bgFilter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modal: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    width,
    height: height * 0.35,
    backgroundColor: 'rgba(0,0,0,.9)',
  },
  errors: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontFamily: 'OpenSans',
    fontWeight: '100',
  },
});
