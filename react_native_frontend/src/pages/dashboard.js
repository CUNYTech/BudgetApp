import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation
} from 'react-native';
import {Logo, Heading, BackgroundWrapper, AlertStatus} from '../components';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bar } from 'react-native-pathjs-charts'




const data = [
  [{
    "v": 49,
    "name": "1/18"
  }, {
    "v": 42,
    "name": "1/19"
  }, {
    "v": 69,
    "name": "1/21"
  }, {
    "v": 62,
    "name": "1/22"
  }, {
    "v": 29,
    "name": "1/23"
  }, {
    "v": 15,
    "name": "1/24"
  }, {
    "v": 35,
    "name": "1/25"
  }, {
    "v": 42,
    "name": "1/26"
  }, {
    "v": 69,
    "name": "1/27"
  }, {
    "v": 62,
    "name": "1/28"
  }, {
    "v": 29,
    "name": "1/30"
  }, {
    "v": 15,
    "name": "2/1"
  }, {
    "v": 35,
    "name": "2/2"
  }, {
    "v": 42,
    "name": "2/3"
  }, {
    "v": 69,
    "name": "2/4"
  }, {
    "v": 62,
    "name": "2/4"
  }, {
    "v": 29,
    "name": "2/5"
  }, {
    "v": 15,
    "name": "2/6"
  }, {
    "v": 35,
    "name": "2/7"
  }, {
    "v": 42,
    "name": "2/8"
  }, {
    "v": 69,
    "name": "2/9"
  }, {
    "v": 62,
    "name": "2/10"
  }, {
    "v": 29,
    "name": "2/11"
  }, {
    "v": 15,
    "name": "2/12"
  }, {
    "v": 35,
    "name": "2/13"
  }]
]

const options = {
  width: 1040,
  height: 100,
  margin: {
    top: 20,
    left: 0,
    bottom: 78,
    right: 0
  },
  color: '#673ab7',
  gutter: -.5,
  animate: {
    type: 'oneByOne',
    duration: 200,
    fillTransition: 3
  },
  axisX: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'bottom',
    label: {
      fontFamily: 'Arial',
      fontSize: 12,
      fontWeight: true,
      fill: '#34495E'
    }
  },
  axisY: {
    showAxis: false,
    showLines: false,
    showLabels: false,
    showTicks: false,
    zeroAxis: false,
    orient: 'left',
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E'
    }
  }
}


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


export default class Dashboard extends Component{

constructor(){
  super();
  this.state = {
    expenseTotal: 0,
    expenseTotalChange: 0,
    addExpenseOffest: 700,
    active: false,
    count: 0,
    budget: 0,
    budgetTracker: {
      value: 0,
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


 _signOut(){
  this.props.Firebase.auth().signOut().then(function() {

    Actions.login();
  }, function(error) {
  // An error happened.
  });
 }

 handleBudgetPress() {
   const expense = +this.state.expenseTotal
   const width = 273
   const budget = 1000
   const value = expense/budget



   if (value < 1) {
     const num = (value*273)
      this.setState({
        budgetTracker: {
          margin: num
        }
      })
    } else {
      this.setState({
        budgetTracker: {
          margin: 273
        }
      })
    }
 }

async _updateExpenses() {
  LayoutAnimation.configureNext(CustomLayoutAnimation)

  const newValue = +this.state.expenseTotalChange
  const total = +this.state.expenseTotalChange + +this.state.expenseTotal

  if (newValue > 0) {
    var curentUser = this.props.Firebase.database().ref().child('users/-Kedv5jZoXwl0BXQH3AP');
    const _this = this

    curentUser.update({
      expenses: total
    })

    curentUser.once('value').then(function(snap){
      var updatedValue = snap.val().expenses;
      return updatedValue
    }).then(function(value){
      const width = 273
      const budget = 1000

      if ((value/budget) < 1) {
        const num = (value*273)
        LayoutAnimation.configureNext(CustomLayoutAnimation)

         _this.setState({
           expenseTotal: value,
           budgetTracker: {
             margin: (value/budget*width)
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
  if (this.state.addExpenseOffest == 700) {
    this.setState({
      addExpenseOffest: 300
    })
  } else {
    this.setState({
      addExpenseOffest: 700,
      expenseTotalChange: 0
    })
  }

}

 render() {
  //  const thing = this.props.Firebase.database().ref('users/-Kedv5jZoXwl0BXQH3AP');
   const expenseTotal = this.state.expenseTotal
   const friends = []
   for (var i = 0; i <= 10; i++) {
     friends.push( <View style={{alignItems: 'center', margin: 10}}>
                     <Icon name="user" size={50} color="#e0e0e0" style={{ width: 40, height: 40, backgroundColor: '#bdbdbd', borderWidth: 1, borderColor: '#1de9b6', borderRadius: 20, overflow: 'hidden'}} />
                     <Text style={{fontSize: 10, fontWeight: 'bold'}}>Tom</Text>
                     <Text style={{fontSize: 10, fontWeight: 'bold'}}>400 pts</Text>
                   </View>)
                   }
    const tracker = this.state.budgetTracker
       return (
           <View style={styles.container}>
             <View style={styles.header}>
               <TouchableOpacity>
                 <Icon name="bars" size={30} color="white" />
               </TouchableOpacity>
               <Text style={{
                   fontSize: 25,
                   textAlign: 'left',
                   width: 250,
                   color: 'white',
                   fontWeight: '300'
                 }}>
                 Dashboard
               </Text>
                <Icon name="diamond" size={30} color="#fff176" />
             </View>

             <View style={styles.section}>
               <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{fontFamily: 'OpenSans', fontWeight: '900', fontSize: 20, color: '#1de9b6'}}>
                  Daily Points
                </Text>
                <Icon name="arrow-right" size={25} color="#424242" />
               </TouchableOpacity>
               <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
                 <Bar data={data} options={options} accessorKey='v'/>
               </ScrollView>
             </View>

            <View style={styles.friendsSection}>
              <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{fontFamily: 'OpenSans', fontWeight: '900', fontSize: 20, color: '#1de9b6'}}>
                   Friends
                 </Text>
                   <Icon name="arrow-right" size={25} color="#424242" />
               </TouchableOpacity>
               <ScrollView horizontal={true} contentContainerStyle showsHorizontalScrollIndicator={false}>
                { friends }
               </ScrollView>
             </View>

             <TouchableOpacity style={styles.section}>
               <Text style={{fontFamily: 'OpenSans', fontWeight: '900', fontSize: 20, color: '#1de9b6', marginBottom: 10}}>
                 Goals
               </Text>
               <TouchableOpacity
                 onPress={this.handleBudgetPress.bind(this)}
                 style={{ height: 40, marginRight: 20, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 20, backgroundColor: '#eeeeee' }}
                 >
                 <View style={{flex: 1, backgroundColor: '#4527a0', borderRadius: 20, width: 0 }}></View>
                 <Text style={{backgroundColor: 'transparent', position: 'absolute', top: 5, left: 110, texttAlign: 'center', fontSize: 20, fontWeight: '900', color: '#00bfa5'}}>Japan Trip</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 onPress={this.handleBudgetPress.bind(this)}
                 style={{ height: 40, marginRight: 20, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 20, backgroundColor: '#eeeeee' }}
                 >
                 <View style={{flex: 1, backgroundColor: '#4527a0', borderRadius: 20, width: 0 }}></View>
                 <Text style={{backgroundColor: 'transparent', position: 'absolute', top: 5, left: 110, texttAlign: 'center', fontSize: 20, fontWeight: '900', color: '#00bfa5'}}>Burning Man</Text>
               </TouchableOpacity>
             </TouchableOpacity>

            <View style={styles.budgetSection}>
              <Text style={{fontFamily: 'OpenSans', fontWeight: '900', fontSize: 20, color: '#1de9b6'}}>
                Budget
              </Text>
              <View
                style={{ height: 40, marginRight: 80, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#e0e0e0'}}
                >
                <View style={{flex: 1, backgroundColor: '#4527a0', width: this.state.budgetTracker.margin }}></View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 60, paddingTop: 5}}>
                <Text style={{marginLeft: this.state.budgetTracker.margin}}>${ expenseTotal }</Text>
                <Text>$1,000</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addExpense} activeOpacity={.7} onPress={this.showAddExpense.bind(this)}>
              <Icon name="plus-circle" size={50} color="#e64a19" style={{backgroundColor: 'white'}}/>
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                top: this.state.addExpenseOffest,
                width: 300,
                height: 200,
                left: 35,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#1de9b6',
                backgroundColor: '#1de9b6',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', fontWeight: '800',}}>ADD AN EXPENSE</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
                <Text style={{fontSize: 35}}>$</Text>
                <TextInput
                  style={{height: 40, width: 100, borderColor: '#e0e0e0', backgroundColor: '#e0e0e0', borderWidth: 1, textAlign: 'center'}}
                  onChangeText={(expenseTotalChange) => this.setState({expenseTotalChange})}
                  value={this.state.expenseTotalChange}
                  />
              </View>
              <TouchableOpacity
                onPress={this._updateExpenses.bind(this)}
                style={{height: 45, width: 200, backgroundColor: '#fff176', borderRadius: 10, marginLeft: 55, overflow: 'hidden', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: '900'}}>ADD</Text>
              </TouchableOpacity>
            </View>
           </View>
         )
       }
     }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#eeeeee',
   },
     header: {
         paddingTop: getPlatformValue('android', 25, 20),
         flex: 0,
         flexDirection: 'row',
         height: 60,
         backgroundColor: '#1de9b6',
         justifyContent: 'space-around',
         alignItems: 'center'
     },
     section: {
         flex: 1,
         borderColor: 'red',
         marginTop: 5,
         borderWidth: 0,
         backgroundColor: 'white',

     },
     budgetSection: {
         flex: 0,
         borderColor: 'red',
         marginTop: 5,
         paddingBottom: 10,
         borderWidth: 0,
         backgroundColor: 'white',

     },
     friendsSection: {
         flex: 0,
         marginTop: 5,
         backgroundColor: 'white',
         borderColor: 'red',
         borderWidth: 0,
     },
     addExpense: {
       position: 'absolute',
       bottom: 25,
       right: 20,
     }
 });
