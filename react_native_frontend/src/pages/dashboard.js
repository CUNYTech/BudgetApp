import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BudgetSnapshot, GoalsSnapshot, FriendsSnapshot, PointsSnapshot } from '../components';
import { getPlatformValue } from '../utils';

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.sideMenu}>
            <Icon name="bars" size={30} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 23,
              textAlign: 'center',
              width: 250,
              color: 'white',
              fontWeight: '300',
              marginBottom: 0,
            }}
          >
                HOME
              </Text>
          <Icon name="diamond" size={20} color="pink" />
        </View>
        <PointsSnapshot Firebase={this.props.Firebase} />
        <FriendsSnapshot Firebase={this.props.Firebase} />
        <GoalsSnapshot Firebase={this.props.Firebase} />
        <BudgetSnapshot Firebase={this.props.Firebase} />
      </View>
    );
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
    borderColor: '#e0e0e0',
  },
});
