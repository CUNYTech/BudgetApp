import React, { Component } from 'react';
import { View, Image, Text, Dimensions, ScrollView, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
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

export default class BudgetSection extends Component {

  constructor() {
    super();
    this.state = {
      budget: 2000,
      totalExpenses: 365,
      progress: 10,
    };
  }

  componentWillMount() {
    this.setBudget();
    this.setTotalExpenes();
  }

  componentDidMount() {
    this.setProgess();
  }

  async setBudget() {
    try {
      const _this = this;
      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      await userBudgetRef.once('value').then((snap) => {
        console.log('snap', snap);
        const value = snap.val().budget;
        return value;
      }).then((response) => {
        _this.setState({
          budget: response,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async setTotalExpenes() {
    try {
      const _this = this;
      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);

      await userTotalExpensesRef.once('value').then((snap) => {
        console.log('snap', snap);
        const value = snap.val().expenses;
        return value;
      }).then((response) => {
        _this.setState({
          totalExpenses: response,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  setProgess() {
    const { budget, totalExpenses } = this.state;
    const progress = (+totalExpenses / +budget);
    this.setState({
      progress,
    });
  }

  showUpdateBudget() {

  }

  render() {
    return (
      <View style={{ height: height * 0.30, backgroundColor: 'transparent' }}>
        <Image
          style={{ position: 'absolute', width: null, height: null, right: 0, left: 0, top: 0, bottom: 0 }}
          source={{ uri: 'https://static.pexels.com/photos/248921/pexels-photo-248921.jpeg' }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.5)' }} />
        </Image>
        <View style={{ top: 10, backgroundColor: 'transparent', position: 'relative', height: 100 }}>
          <View style={{ position: 'absolute', top: 30, right: width * 0.35 }}>
            <Progress.Circle
              size={120}
              progress={this.state.totalExpenses / this.state.budget}
              color="#f48fb1"
              unfilledColor={'rgba(255,255,255,.3)'}
              borderWidth={0}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center' }}>
            <View style={{ top: 100 }}>
              <Text style={{ color: 'white', fontSize: 10, left: 5, color: '#f48fb1' }}>Total Expenses</Text>
              <Text style={{ color: 'white', fontSize: 40, fontFamily: 'OpenSans' }} >
                ${this.state.totalExpenses}
              </Text>
            </View>
            <View style={{ top: 0 }}>
              <Text style={{ color: 'white', fontSize: 40, fontFamily: 'OpenSans' }} >
                ${this.state.budget}
              </Text>
              <Text style={{ color: 'white', fontSize: 10, textAlign: 'right', right: 5, color: '#f48fb1' }}>Budget</Text>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 10, right: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', margin: 10, fontSize: 10 }}>update budget</Text>
          <TouchableOpacity onPress={this.showUpdateBudget.bind(this)}><Icon name="plus-circle" size={40} color="rgba(255,255,255,1)" style={{ bottom: 0 }} /></TouchableOpacity>
        </View>
      </View>
    );
  }
}
