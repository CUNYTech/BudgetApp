import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity
} from 'react-native';
import {Logo, Heading, BackgroundWrapper, AlertStatus} from '../components';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Dashboard extends Component{


  state = {
    active: false
  };

 _signOut(){
  this.props.Firebase.auth().signOut().then(function() {

    Actions.login();
  }, function(error) {
  // An error happened.
  });
 }

 render() {
       return (
           <View style={styles.container}>
             <View style={styles.header}>
               <TouchableOpacity>
                 <Icon name="bars" size={30} color="white" style={{}} />
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
                 <Icon name="diamond" size={30} color="#fff176" style={{}} />
             </View>
             <View style={styles.section}>

             </View>
             <View style={styles.section}>
               <ScrollView horizontal={true} contentContainerStyle>

               </ScrollView>
             </View>
             <View style={styles.section}>

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
         backgroundColor: '#1de9b6',
         justifyContent: 'space-around',
         alignItems: 'center'
     },
     section: {
         flex: 1,
         borderColor: 'red',
         borderWidth: 1,
     }
 });
