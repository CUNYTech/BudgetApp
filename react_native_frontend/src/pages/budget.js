import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
import { BackgroundWrapper } from '../components';
import { getPlatformValue } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';


let CustomLayoutAnimation = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

export default class Budget extends Component {

  constructor(){
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }


  async _updateExpenses() {

    try{

      let ref = this.props.Firebase.database().ref();
      let user = this.props.Firebase.auth().currentUser;
      let uid = user.uid;

      let userExpensesRef = ref.child('userReadable/userExpenses').child(uid);

    const newExpenseValue = +this.state.expenseTotalChange;
    const newExpensesTotal = +this.state.expenseTotalChange + +this.state.expenseTotal;
    const _this = this;
    const budgetTrackerWidth = 273;
    const fixedBudget = 1000;

    if (newExpenseValue > 0) {
      // let curentUser = this.props.Firebase.database().ref().child(uid);
      userExpensesRef.update({ expenses: newExpensesTotal });
      userExpensesRef.once('value').then(function(snap){
        let updatedValue = snap.val().expenses;
        return updatedValue
      }).then(function(value){
        if ((value/fixedBudget) < 1) {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          _this.setState({
            expenseTotal: value,
            budgetTracker: {
              margin: (value/fixedBudget*budgetTrackerWidth)
            }
          })
        }
         else {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          _this.setState({
            expenseTotal: value,
            budgetTracker: {
              margin: 273
            }
          })
        }
      })
    }
    this.showAddExpense();
  }

    catch(e){
      console.log(e);
    }
  }

  showAddExpense() {
    let offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
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
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="bars"
          size={30}
          color="white"
          onPress={this.props.sideMenu}/>
        </TouchableOpacity>
        <Text style={{
          fontSize: 25,
          textAlign: 'center',
          width: 250,
          color: 'white',
          fontWeight: '300',
          marginBottom: 5
        }}>
          BUDGET
        </Text>
        <Icon name="diamond" size={20} color="pink" />
      </View>
        <TouchableOpacity style={styles.addExpense} activeOpacity={.7} onPress={this.showAddExpense.bind(this)}>
          <Icon name="plus-circle" size={50} color="#0d47a1" style={{backgroundColor: 'white', overflow: 'hidden', borderRadius: 20}}/>
        </TouchableOpacity>
      </View>
     )
   }
 }


 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
   },
   header: {
       paddingTop: getPlatformValue('android', 25, 20),
       flex: 0,
       flexDirection: 'row',
       height: 60,
       backgroundColor: '#424242',
       justifyContent: 'space-around',
       alignItems: 'center',
       borderBottomWidth: 1,
       borderColor: '#424242'
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
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 0,
      backgroundColor: 'white'
    }
 });





 // <View style={{
 //   position: 'relative',
 //   bottom: this.state.addExpenseOffest,
 //   width: 300,
 //   height: 200,
 //   left: 35,
 //   borderWidth: 1,
 //   borderRadius: 15,
 //   borderColor: 'black',
 //   backgroundColor: 'black',
 //   justifyContent: 'center',
 // }}>
 // <Text style={{textAlign: 'center', color: '#FFFFFF' }}>
 //   ADD AN EXPENSE
 // </Text>
 // <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
 //   <Text style={{color: 'white',fontSize: 35}}>
 //     $
 //   </Text>
 //   <TextInput
 //     style={{height: 40, width: 100, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center'}}
 //     onChangeText={(expenseTotalChange) => this.setState({expenseTotalChange})}
 //     value={""+this.state.expenseTotalChange+""}
 //   />
 // </View>
 // <TouchableOpacity
 //   onPress={this._updateExpenses.bind(this)}
 //   style={styles.addExpenseButton}
 //   >
 //     <Text style={{textAlign: 'center', color: 'white' }}>
 //       ADD
 //     </Text>
 //   </TouchableOpacity>
 // </View>
