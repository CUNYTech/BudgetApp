import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Alert, Text, Dimensions, ScrollView, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { _updatePoints } from '../../utils/pointHelpers';

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

export default class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      expenseModalOffset: height * 0.5,
      expenseValueChange: '',
      expenseTitleChange: '',
      expenses: [],
      error: 'transparent',
    };
  }

  componentWillMount() {
    this._setExpenses();
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
      const newExpensesTotal = +newExpenseValue + +_this.props.expenseTotal;
      const fixedBudget = _this.props.budget;

      if (newExpenseValue > 0) {
        userTotalExpensesRef.update({ expenses: newExpensesTotal });

        userTotalExpensesRef.once('value').then((snap) => {
          const updatedValue = snap.val().expenses;
          return updatedValue;
        }).then((value) => {
          _this.props.setExpense(value);
        });
      }
      _this._addExpense();
      const event_2 = 2;
      _updatePoints(event_2, uid);
    } catch (e) {
    }
  }

  toggleUpdateExpense() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    dismissKeyboard();
    if (this.state.expenseModalOffset === 0) {
      this.setState({
        expenseModalOffset: height * 0.5,
        expenseValueChange: '',
        expenseTitleChange: '',
        error: 'transparent',
      });
    } else {
      this.setState({
        expenseModalOffset: 0,
        expenseValueChange: '',
        expenseTitleChange: '',
        error: 'transparent',
      });
    }
  }

  _setExpenses() {
    const _this = this;
    const userExpense = [];
    const ref = _this.props.Firebase.database().ref();
    const uid = _this.props.Firebase.auth().currentUser.uid;
    const userExpenseRef = ref.child('userReadable/userExpenses');

    userExpenseRef.child(uid).orderByKey().once('value').then((snap) => {
      snap.forEach((snapshot) => {
        userExpense.push({ title: snapshot.val().expense, amount: snapshot.val().amount });
      });
      return Promise.all(userExpense);
    }).then((userExpense) => {
      _this.setState({
        expenses: userExpense,
      });
    });
  }

  _addExpense() {
    if (!Number.isInteger(+this.state.expenseValueChange) || +this.state.expenseValueChange <= 0 || this.state.expenseTitleChange === '') {
      this.setState({
        error: 'red',
      });
      return;
    }
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
    this._setExpenses();
    this.toggleUpdateExpense();
    // this._setGoals();
  }

  render() {
    let i = 1;
    const expensesView = [];

    this.state.expenses.forEach((element) => {
      expensesView.push(
        <View key={i} style={styles.itemWrapper} >
          <Text style={styles.generalText}>
            { element.title}
          </Text>
          <Text style={styles.generalText}>
            $<Text style={styles.generalText}>
              { element.amount}
            </Text>
          </Text>
        </View>,
     );
      i += 1;
    });

    return (
      <KeyboardAvoidingView behavior={this.state.behavior}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
            Expenses
          </Text>
            <TouchableOpacity onPress={this.toggleUpdateExpense.bind(this)}>
              <Icon
                name="plus-circle"
                size={20}
                color={theme.accent}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ backgroundColor: theme.bg }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 25 }}>
            { expensesView.reverse() }
          </ScrollView>
          <View style={[styles.modal, { top: this.state.expenseModalOffset }]}>
            <Text style={{ color: '#bdbdbd', fontSize: 17, margin: 10, fontFamily: 'OpenSans', fontWeight: '100' }}>
            Add an Expense
          </Text>
            <View style={{ borderBottomWidth: 0.5, borderColor: theme.accent }}>
              <TextInput
                onFocus={() => this.setState({ behavior: 'position' })}
                onEndEditing={() => this.setState({ behavior: '' })}
                placeholder="Title"
                placeholderTextColor="rgba(255,255,255,.5)"
                style={{ width: 100, height: 40, alignSelf: 'center', color: 'white', fontSize: 15 }}
                onChangeText={expenseTitleChange => this.setState({ expenseTitleChange })}
                value={this.state.expenseTitleChange}
              />
            </View>
            <TextInput
              onFocus={() => this.setState({ behavior: 'position' })}
              onEndEditing={() => this.setState({ behavior: '' })}
              keyboardType="numeric"
              placeholder="$"
              placeholderTextColor="white"
              style={{ width: 100, height: 40, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,.1)', margin: 10, color: 'white' }}
              onChangeText={expenseValueChange => this.setState({ expenseValueChange })}
              value={this.state.expenseValueChange}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'black', width: width * 0.5, padding: 10, margin: 10, borderRadius: 10, alignItems: 'center', borderWidth: 0.5, borderColor: theme.accent }}
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
            <Text style={[styles.errors, { color: this.state.error }]}>
            invalid title or value
          </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: height * 0.45,
    margin: 0,
    backgroundColor: theme.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.bg,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: theme.accent,
    width,
  },
  headerText: {
    color: '#bdbdbd',
    fontSize: 21,
    fontFamily: 'OpenSans',
    fontWeight: '100',
    marginLeft: 10,
  },
  itemWrapper: {
    height: 50,
    backgroundColor: 'rgb(0,0,0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 0.5,
    borderColor: 'transparent',
  },
  generalText: {
    fontSize: 17,
    fontFamily: 'OpenSans',
    color: theme.text,
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
  errors: {
    position: 'absolute',
    top: 40,
    left: 60,
    fontFamily: 'OpenSans',
    fontWeight: '100',
  },
});
