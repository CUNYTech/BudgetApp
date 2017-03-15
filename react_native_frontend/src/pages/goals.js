import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation, Platform
} from 'react-native';
import {Logo, Heading, BackgroundWrapper, AlertStatus, BudgetSnapshot, GoalsSnapshot, FriendsSnapshot, PointsSnapshot} from '../components';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bar } from 'react-native-pathjs-charts'

var CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

export default class Goals extends Component{

  constructor(){
    super();
    this.state = {
      expenseTotal: 0,
      friendChange: '',
      addFriendOffset: -200,
    };
  }

  componentDidMount() {
    this.props.hideSideMenu()
  }


  back() {
    Actions.pop()
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
   var i = 1
   const goals = []
   const myGoals = ['Paris Trip', "Yeezy's", "Mac"]
   myGoals.forEach(function(element) {
     goals.push(
       <View key={i} style={{marginTop: 10}}>
         <Text style={{backgroundColor: 'transparent', position: 'absolute', width: 335, textAlign: 'center', fontSize: 15, color: '#424242'}}>
           { element }
         </Text>
         <View style={styles.goal} >
         <View style={{flex: 1, backgroundColor: '#a5d6a7', borderRadius: 0, width: 100}}></View>
     </View>
   </View>
     )
     i+=1
   });
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
                GOALS
              </Text>
              <Icon name="diamond" size={20} color="pink" />
            </View>
            <TouchableOpacity style={{flex: 0, paddingLeft: 10 }} onPress={this.back.bind(this)}>
              <Icon name='angle-left' size={0} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
              <Text style={{marginLeft: 6,fontFamily: 'OpenSans', fontSize: 17, color: '#424242', marginBottom: 10}}>
                GOALS
              </Text>
              { goals }
            </TouchableOpacity>
            <TouchableOpacity style={styles.addExpense} activeOpacity={.7} onPress={this.showAddExpense.bind(this)}>
              <Icon name="plus-circle" size={50} color="#a5d6a7" style={{backgroundColor: 'white', overflow: 'hidden', borderRadius: 20}}/>
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
              <Text style={{textAlign: 'center', color: '#424242' }}>
                ADD AN EXPENSE
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
                <Text style={{color: 'white',fontSize: 35}}>
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
