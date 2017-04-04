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

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

export default class Expenses extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Expenses
          </Text>
        </View>
        <ScrollView style={{ backgroundColor: theme.bg }}>
          <View style={styles.itemWrapper} >
            <Text style={styles.generalText}>
              Food
            </Text>
            <Text style={styles.generalText}>
              $<Text style={styles.generalText}>
                23.42
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: height * 0.5,
    margin: 0,
    backgroundColor: theme.bg,
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
  itemWrapper: {
    height: 50,
    backgroundColor: 'rgb(0,0,0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 1,
    marginBottom: 1,
    borderColor: 'transparent',
  },
  generalText: {
    fontSize: 17,
    fontFamily: 'OpenSans',
    color: theme.text,
  },
});
