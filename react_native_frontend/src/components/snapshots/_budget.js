import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation,Platform
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
      expenseTotalChange: '0',
      addExpenseOffest: -200,
      budget: 0,
      budgetTracker: {
        margin: 0
      }
    };
  }

  componentWillMount(){
    this.setExpense();
  }

  async setExpense() {
    try{
      const _this = this
      const fixedBudget = 1000
      const budgetTrackerWidth = 273
      await this.props.Firebase.auth().currentUser;

    var uid =  this.props.Firebase.auth().currentUser.uid;
    var ref = this.props.Firebase.database().ref();
    var userExpensesRef = ref.child('userReadable/userExpenses').child(uid);

    userExpensesRef.once('value').then(function(snap){
      var updatedValue = snap.val().expenses;
      return updatedValue
    }).then(function(value){
      if((value/fixedBudget) < 1){
      _this.setState({
        expenseTotal: value,
        budgetTracker: {
          margin: (value/fixedBudget*budgetTrackerWidth)
        }
      })
    }
    else{
      _this.setState({
        expenseTotal: value,
        budgetTracker: {
          margin: (budgetTrackerWidth)
        }
      })
    }
    })
  }
  catch(e){
    console.log(error);
  }
}


  async _updateExpenses() {

    try{

      var ref = this.props.Firebase.database().ref();
      var user = this.props.Firebase.auth().currentUser;
      var uid = user.uid;

      var userExpensesRef = ref.child('userReadable/userExpenses').child(uid);

    const newExpenseValue = +this.state.expenseTotalChange
    const newExpensesTotal = +this.state.expenseTotalChange + +this.state.expenseTotal
    const _this = this
    const budgetTrackerWidth = 273
    const fixedBudget = 1000

    if (newExpenseValue > 0) {
      // var curentUser = this.props.Firebase.database().ref().child(uid);
      userExpensesRef.update({ expenses: newExpensesTotal })
      userExpensesRef.once('value').then(function(snap){
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
        }
         else {
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

    catch(e){
      console.log(e);
    }
  }

  showAddExpense() {
    var offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation)
    if (this.state.addExpenseOffest == -200) {
      this.setState({ addExpenseOffest: offSet }) //Set to 0 for android
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
      <Text style={{fontFamily: 'OpenSans', fontSize: 20, color: 'black'}}>
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
        <Icon name="plus-circle" size={50} color="#3949ab" style={{backgroundColor: 'white'}}/>
      </TouchableOpacity>
      <View style={{
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
      }}>
        <Text style={{textAlign: 'center', color: 'white' }}>
          ADD AN EXPENSE
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <Text style={{fontSize: 35}}>
            $
          </Text>
          <TextInput
            style={{height: 40, width: 100, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center'}}
            onChangeText={(expenseTotalChange) => this.setState({expenseTotalChange})}
            value={""+this.state.expenseTotalChange+""}
          />
        </View>
        <TouchableOpacity
          onPress={this._updateExpenses.bind(this)}
          style={styles.addExpenseButton}
        >
          <Text style={{textAlign: 'center', color: 'white' }}>
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
        backgroundColor: '#3949ab',
        borderRadius: 10,
        marginLeft: 55,
        overflow: 'hidden',
        justifyContent: 'center'
     }
 });
