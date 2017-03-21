import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput,
    LayoutAnimation, Platform} from 'react-native';
import { BackgroundWrapper } from '../components';
import { getPlatformValue } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';

let CustomLayoutAnimation = {
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
      addGoalOffset:-300,
      goal: 'New Goal Title',
      amount: 0,
      goals: [],
    };
  }

  //function to be called upon users pressing of button component
   _addGoal(){
     let ref = this.props.Firebase.database().ref();
     let userGoalsRef = ref.child('userReadable/userGoals');
     let userGoal = this.state.goal;
     let amount = this.state.amount;
     let uid = this.props.Firebase.auth().currentUser.uid;

     userGoalsRef.child(uid).push({
      goal: userGoal,
      amount: amount,
    });
    this._showAddGoal();
    this._setGoals()
     }

     componentDidMount(){
       this._setGoals();
       this.props.hideSideMenu()
     }

  _setGoals(){
    let _this = this;
    let userGoals = [];
    const ref = _this.props.Firebase.database().ref();
    const uid = _this.props.Firebase.auth().currentUser.uid;

    const userGoalsRef = ref.child('userReadable/userGoals');
    userGoalsRef.child(uid).orderByKey().once('value').then(function(snap){
      snap.forEach(function(snapshot){
        console.log(snapshot.val().goal);
        userGoals.push({"goal": snapshot.val().goal, "amount": snapshot.val().amount})
      });
      return Promise.all(userGoals)
    }).then(function(userGoals) {
      _this.setState({
        goals: userGoals
      });
    });
    userGoalsRef.child('1').orderByValue().once('value').then(function(snap){
      console.log(userGoals);
    });
  }


  handleChangeInput(stateName, text) {
      this.setState({
          [stateName]: text
      });
  }


  _showAddGoal(){
    const offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addGoalOffset == -300) {
      this.setState({ addGoalOffset: offSet }) //Set to 0 for android
    } else {
      this.setState({
        addGoalOffset: -300,
        expenseTotalChange: 0
      })
    }
  }

 render() {
   let i = 1;
   const goals = [];

   this.state.goals.forEach(function(element) {
     goals.push(
       <View key={i} style={{marginTop: 10}}>
         <Text style={{backgroundColor: 'transparent', margin: 20, width: 335, textAlign: 'center', fontSize: 15, color: '#424242'}}>
           { element.goal }
         </Text>
         <View style={styles.goal} >
         <View style={{flex: 1, backgroundColor: '#a5d6a7', borderRadius: 0, width: 100}}></View>
     </View>
   </View>
     );
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
            <TouchableOpacity style={styles.section}>
              <Text style={{marginLeft: 6,fontFamily: 'OpenSans', fontSize: 17, color: '#424242', marginBottom: 10}}>
                GOALS
              </Text>
              { goals }
            </TouchableOpacity>
            <TouchableOpacity style={styles.addExpense} activeOpacity={.7} onPress={this._showAddGoal.bind(this)}>
              <Icon name="plus-circle" size={50} color="#a5d6a7" style={{backgroundColor: 'white', overflow: 'hidden', borderRadius: 20}}/>
            </TouchableOpacity>
            <View style={{
              position: 'absolute',
              bottom: this.state.addGoalOffset,
              width: 300,
              height: 250,
              left: 35,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: 'black',
              backgroundColor: 'black',
              justifyContent: 'center',
            }}>
              <Text style={{bottom:40,textAlign: 'center', color: '#424242' }}>
                ADD NEW GOAL
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
                <Text style={{fontFamily:'OpenSans', left:120, color: 'white',fontSize: 25}}>
                  $
                </Text>
                <TextInput
                  style={{left:130 ,height: 40, width: 200, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center'}}
                  onChangeText={this.handleChangeInput.bind(this, 'amount')}
                  value={""+this.state.amount+""}
                />

                <TextInput
                  style={{bottom: 50,right:70, height: 40, width: 200, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center'}}
                  onChangeText={this.handleChangeInput.bind(this, 'goal')}
                  value={""+this.state.goal+""}
                />
                <Text style={{fontFamily:'OpenSans',bottom: 45,left:-327,textAlign:'left',color: 'white',fontSize: 22}}>
                    Goal
                </Text>
              </View>
              <TouchableOpacity
                onPress={this._addGoal.bind(this)}
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
