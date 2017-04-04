import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get('window');

const CustomLayoutAnimation = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};


const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
};

export default class Savings extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Total Savings
          </Text>
        </View>
        <Text style={styles.savings}>
          $5250
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.20,
    backgroundColor: theme.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: theme.bg,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: theme.accent,
    width,
    alignSelf: 'flex-start',
  },
  headerText: {
    color: '#bdbdbd',
    fontSize: 21,
    fontFamily: 'OpenSans',
    fontWeight: '100',
  },
  savings: {
    color: theme.text,
    fontSize: 50,
    fontFamily: 'OpenSans',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
