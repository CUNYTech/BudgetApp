import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity
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





export default class Dashboard extends Component{


  state = {
    active: false,
    budgetTracker: {
      value: 0,
      margin: 0
    }
  };

 _signOut(){
  this.props.Firebase.auth().signOut().then(function() {

    Actions.login();
  }, function(error) {
  // An error happened.
  });
 }

 handleBudgetPress() {
   const num = this.state.budgetTracker.margin
   const num_v = this.state.budgetTracker.value
   if (num_v < 1000) {
      this.setState({
        budgetTracker: {
          value: (num_v + 30),
          margin: (num + 10)
        }
      })
    }
 }

 render() {
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
                 <View style={{flex: 1, backgroundColor: '#4527a0', borderRadius: 20, width: this.state.budgetTracker.margin }}></View>
                 <Text style={{backgroundColor: 'transparent', position: 'absolute', top: 5, left: 110, texttAlign: 'center', fontSize: 20, fontWeight: '900', color: '#00bfa5'}}>Japan Trip</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 onPress={this.handleBudgetPress.bind(this)}
                 style={{ height: 40, marginRight: 20, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 20, backgroundColor: '#eeeeee' }}
                 >
                 <View style={{flex: 1, backgroundColor: '#4527a0', borderRadius: 20, width: this.state.budgetTracker.margin }}></View>
                 <Text style={{backgroundColor: 'transparent', position: 'absolute', top: 5, left: 110, texttAlign: 'center', fontSize: 20, fontWeight: '900', color: '#00bfa5'}}>Burning Man</Text>
               </TouchableOpacity>
             </TouchableOpacity>

            <View style={styles.budgetSection}>
              <Text style={{fontFamily: 'OpenSans', fontWeight: '900', fontSize: 20, color: '#1de9b6'}}>
                Budget
              </Text>
              <TouchableOpacity
                onPress={this.handleBudgetPress.bind(this)}
                style={{ height: 40, marginRight: 80, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#e0e0e0'}}
                >
                <View style={{flex: 1, backgroundColor: '#4527a0', width: this.state.budgetTracker.margin }}></View>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 60, paddingTop: 5}}>
                <Text style={{marginLeft: this.state.budgetTracker.margin}}>${this.state.budgetTracker.value}</Text>
                <Text>$1,000</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addExpense} activeOpacity={.7}>
              <Icon name="plus-circle" size={50} color="#e64a19" style={{backgroundColor: 'white'}}/>
            </TouchableOpacity>
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
