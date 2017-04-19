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
      budgetTotal: 0,
    };
  }

  componentWillMount() {
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

  setBudgetTotal(num) {
    this.setState({
      budgetTotal: num,
    });
  }

  setExpenseTotal(num) {
    this.setState({
      expenseTotal: num,
    });
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
          <BudgetSection
            Firebase={this.props.Firebase}
            setBudget={this.setBudgetTotal.bind(this)}
            setExpense={this.setExpenseTotal.bind(this)}
            expenseTotal={this.state.expenseTotal}
          />
          <Savings Firebase={this.props.Firebase} />
          <Expenses
            Firebase={this.props.Firebase}
            expenseTotal={this.state.expenseTotal}
            budget={this.state.budget}
            setExpense={this.setExpenseTotal.bind(this)}
          />
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
    borderColor: '#424242',
    borderBottomWidth: 1,
  },
});
