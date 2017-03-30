import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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

export default class Expenses extends Component {

  render() {
    return (
      <View style={{ height: height * 0.5, margin: 0, backgroundColor: '#212121' }}>
        <View style={{ backgroundColor: '#212121', borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#f48fb1', width, alignSelf: 'flex-start' }}>
          <Text style={{ color: '#bdbdbd', fontSize: 21, fontFamily: 'OpenSans', fontWeight: '100' }}>Expenses</Text>
        </View>
        <ScrollView style={{ backgroundColor: '#212121' }}>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'white' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'white' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'white' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'white' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'black' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'white' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'white' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
          <View
            style={{ height: 50,
              backgroundColor: 'rgb(0,0,0)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              marginTop: 1,
              marginBottom: 1,
              borderColor: 'transparent' }}
          >
            <Text style={{ fontSize: 17, color: 'white' }}>
              Food
            </Text>
            <Text style={{ fontSize: 17, color: 'white' }}>
              $<Text style={{ fontSize: 17, color: 'white' }}>23.42</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
