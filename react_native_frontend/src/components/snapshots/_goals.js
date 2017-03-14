import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class GoalsSnapshot extends Component{

  constructor(){
    super();
    this.state = {

    };
  }

  handlePress(){
    Actions.goals()
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
      <TouchableOpacity style={styles.section} onPress={this.handlePress.bind(this)}>
        <Text style={{marginLeft: 6,fontFamily: 'OpenSans', fontSize: 17, color: '#424242', marginBottom: 10}}>
          GOALS
        </Text>
        { goals }
      </TouchableOpacity>
    )
  }
}

 const styles = StyleSheet.create({
   section: {
       flex: 1,
       borderColor: '#e0e0e0',
       marginTop: 2,
       borderBottomWidth: 1,
       backgroundColor: 'white'
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
