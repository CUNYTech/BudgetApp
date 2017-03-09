import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation
} from 'react-native';
import {Logo, Heading, BackgroundWrapper, AlertStatus, BudgetSnapshot, GoalsSnapshot, FriendsSnapshot, PointsSnapshot} from '../components';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bar } from 'react-native-pathjs-charts'

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

    };
  }


 render() {
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
            <PointsSnapshot Firebase={this.props.Firebase} />
            <FriendsSnapshot Firebase={this.props.Firebase} />
            <GoalsSnapshot Firebase={this.props.Firebase} />
            <BudgetSnapshot Firebase={this.props.Firebase} />
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
         backgroundColor: 'black',
         justifyContent: 'space-around',
         alignItems: 'center'
    }
 });
