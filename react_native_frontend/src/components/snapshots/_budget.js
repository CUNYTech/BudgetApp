import React, { Component } from 'react';
import {
    Alert, View, Text, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { _updatePoints } from '../../utils/pointHelpers';

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
      expenseModalOffset: height * 0.5,
      expenseValueChange: '',
      expenseTotal: 0,
      expenseTotalChange: '0',
      budgetValue: 0,
      progress: 1,
    };
  }

  componentWillMount() {
    this.setBudget();
    this.setExpense();
  }

  componentDidMount() {
    // this.setProgess();
  }

  setProgess() {
    // this.setState({
    //   progress: (+this.state.expenseTotal / +this.state.budgetValue),
    // });
    return (+this.state.expenseTotal / +this.state.budgetValue);
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
      console.log(e);
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
      console.log(e);
    }
  }

  async _updateExpenses() {
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
      });
    } catch (e) {
      Alert.alert(e);
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
    if (this.state.expenseModalOffset === -height * 0.8) {
      this.setState({
        expenseModalOffset: height * 0.5,
        expenseValueChange: '',
      });
    } else {
      this.setState({
        expenseModalOffset: -height * 0.8,
        expenseValueChange: '',
      });
    }
  }

  render() {
    let progress = 0.01;
    if (this.setProgess() < 1) {
      progress = this.setProgess();
    }

    return (
      <TouchableOpacity style={styles.budgetSection} onPress={this.handlePress.bind(this)}>
        <Text style={styles.titleText}>
          BUDGET
        </Text>
        <View style={styles.budgetSnap}>
          <Progress.Bar
            color={'#ffc107'}
            height={1}
            progress={progress}
            width={273}
            borderColor={'black'}
            unfilledColor={'#424242'}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 60, paddingTop: 5 }}>
          <Text style={{ color: theme.text, marginLeft: 10 }}>
          ${ this.state.expenseTotal }
          </Text>
          <Text style={{ right: 20, color: theme.text }}>
          ${ this.state.budgetValue }
          </Text>
        </View>
        <TouchableOpacity style={styles.addExpense} activeOpacity={0.7} onPress={this.toggleUpdateExpense.bind(this)}>
          <Icon name="plus-circle" size={50} style={styles.iconStyle} />
        </TouchableOpacity>

        <View style={[styles.modal, { top: this.state.expenseModalOffset }]}>
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
            placeholder="$"
            placeholderTextColor="white"
            style={{ width: 100, height: 40, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,.1)', margin: 10, color: 'white' }}
            onChangeText={expenseValueChange => this.setState({ expenseValueChange })}
            value={this.state.expenseValueChange}
          />
          <TouchableOpacity
            style={{ backgroundColor: 'black', width: width * 0.5, padding: 10, margin: 10, borderRadius: 10, alignItems: 'center' }}
            onPress={this._updateExpenses.bind(this)}
          >
            <Text style={{ color: theme.accent, fontFamily: 'OpenSans' }}>
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
        </View>


      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  budgetSection: {
    flex: 0,
    borderColor: '#424242',
    paddingBottom: 10,
    borderWidth: 0,
    backgroundColor: 'black',
  },
  budgetSnap: {
    height: 16,
    marginRight: 80,
    marginLeft: 20,
    marginTop: 10,
  },
  emphasized: {
    color: 'white',
    fontSize: 35,
  },
  titleText: {
    marginLeft: 6,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#bdbdbd',
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
    color: '#424242',
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
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
