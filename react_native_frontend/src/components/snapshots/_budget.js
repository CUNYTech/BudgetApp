import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';


var CustomLayoutAnimation = {
  duration: 50,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};


export default class BudgetSnapshot extends Component{

  constructor(){
    super();
    this.state = {
      expenseTotal: 0,
      expenseTotalChange: 0,
      addExpenseOffest: 700,
      budget: 0,
      budgetTracker: {
        margin: 0
      }
    };
  }


  async setExpense(){
    var curentUser = this.props.Firebase.database().ref().child('users/-Kedv5jZoXwl0BXQH3AP');
    curentUser.once('value').then(function(snap){
      var updatedValue = snap.val().expenses;
      return updatedValue
    }).then(function(value){
      _this.setState({
        expenseTotal: value
      })
    })
  }

async _updateExpenses() {
  const newExpenseValue = +this.state.expenseTotalChange
  const newExpensesTotal = +this.state.expenseTotalChange + +this.state.expenseTotal
  const _this = this
  const budgetTrackerWidth = 273
  const fixedBudget = 1000

  if (newExpenseValue > 0) {
    var curentUser = this.props.Firebase.database().ref().child('users/-Kedv5jZoXwl0BXQH3AP');

    curentUser.update({ expenses: newExpensesTotal })

    curentUser.once('value').then(function(snap){
      var updatedValue = snap.val().expenses;
      return updatedValue
    }).then(function(value){
      if ((value/fixedBudget) < 1) {
        LayoutAnimation.configureNext(CustomLayoutAnimation)
        _this.setState({
          expenseTotal: value,
          budgetTracker: {
            margin: (value/fixedBudget*budgetTrackerWidth)
          }
        })
      } else {
        LayoutAnimation.configureNext(CustomLayoutAnimation)
        _this.setState({
          expenseTotal: value,
          budgetTracker: {
            margin: 273
          }
        })
      }
    })
  }
  this.showAddExpense()
}

  showAddExpense() {
    LayoutAnimation.configureNext(CustomLayoutAnimation)
    if (this.state.addExpenseOffest == -200) {
      this.setState({ addExpenseOffest: 220 })
    } else {
      this.setState({
        addExpenseOffest: -200,
        expenseTotalChange: 0
      })
    }
  }

 render() {
       return (
          <View style={styles.budgetSection}>
            <Text style={{fontFamily: 'OpenSans', fontWeight: '900', fontSize: 20, color: '#1de9b6'}}>
              Budget
            </Text>
            <View style={{ height: 40, marginRight: 80, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#e0e0e0'}}>
              <View style={{flex: 1, backgroundColor: '#4527a0', width: this.state.budgetTracker.margin }}></View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 60, paddingTop: 5}}>
              <Text style={{marginLeft: this.state.budgetTracker.margin}}>
                ${ this.state.expenseTotal }
              </Text>
              <Text>
                $1,000
              </Text>
            </View>
            <TouchableOpacity style={styles.addExpense} activeOpacity={.7} onPress={this.showAddExpense.bind(this)}>
              <Icon name="plus-circle" size={50} color="#e64a19" style={{backgroundColor: 'white'}}/>
            </TouchableOpacity>
            <View style={{
              position: 'absolute',
              bottom: this.state.addExpenseOffest,
              width: 300,
              height: 200,
              left: 35,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '#1de9b6',
              backgroundColor: '#1de9b6',
              justifyContent: 'center',
            }}>
              <Text style={{textAlign: 'center', fontWeight: '800',}}>
                ADD AN EXPENSE
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
                <Text style={{fontSize: 35}}>
                  $
                </Text>
                <TextInput
                  style={{height: 40, width: 100, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center'}}
                  onChangeText={(expenseTotalChange) => this.setState({expenseTotalChange})}
                  value={this.state.expenseTotalChange}
                />
              </View>
              <TouchableOpacity
                onPress={this._updateExpenses.bind(this)}
                style={styles.addExpenseButton}
              >
                <Text style={{textAlign: 'center', fontWeight: '900'}}>
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
         )
       }
     }

 const styles = StyleSheet.create({
     budgetSection: {
         flex: 0,
         borderColor: 'red',
         marginTop: 5,
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
        backgroundColor: '#fff176',
        borderRadius: 10,
        marginLeft: 55,
        overflow: 'hidden',
        justifyContent: 'center'
     }
 });
