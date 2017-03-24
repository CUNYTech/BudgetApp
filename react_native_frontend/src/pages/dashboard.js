import React, {Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import { BackgroundWrapper, BudgetSnapshot, GoalsSnapshot, FriendsSnapshot, PointsSnapshot} from '../components';
import { getPlatformValue } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';

let CustomLayoutAnimation = {
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

  componentDidMount() {

  }

 render() {
       return (
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={this.props.sideMenu}>
                <Icon name="bars" size={30} color="white" />
              </TouchableOpacity>
              <Text style={{
                fontSize: 23,
                textAlign: 'center',
                width: 250,
                color: 'white',
                fontWeight: '300',
                marginBottom:0
              }}>
                HOME
              </Text>
              <Icon name="diamond" size={20} color="pink" />
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
     backgroundColor: '#e0e0e0',
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
         borderColor: '#e0e0e0'
    }
 });
