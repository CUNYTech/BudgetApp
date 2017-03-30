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

export default class Savings extends Component {

  render() {
    return (
      <View style={{ height: height * 0.20, backgroundColor: '#212121', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#212121', borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#f48fb1', width, alignSelf: 'flex-start' }}>
          <Text style={{ color: '#bdbdbd', fontSize: 21, fontFamily: 'OpenSans', fontWeight: '100' }}>Total Savings</Text>
        </View>
        <Text style={{ color: 'white', fontSize: 50, fontFamily: 'OpenSans', paddingBottom: 20, paddingTop: 20 }}>$5250</Text>
      </View>
    );
  }
}
