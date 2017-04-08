import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get('window');

const CustomLayoutAnimation = {
  duration: 200,
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

  constructor() {
    super();
    this.state = {
      savingValueChange: '0',
      modalOffset: height * 0.30,
      totalSavings: 0,
    };
  }

  componentWillMount() {
    this.setSavings();
  }

  async setSavings() {
    try {
      const _this = this;
      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userBudgetRef = ref.child('userReadable/userSavings').child(uid);

      await userBudgetRef.once('value').then((snap) => {
        console.log('snap', snap);
        const value = snap.val().savings;
        return value;
      }).then((response) => {
        _this.setState({
          totalSavings: response,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async _updateSavings() {
    try {
      const _this = this;
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userSavingsRef = ref.child('userReadable/userSavings').child(uid);

      const newSavingsValue = +this.state.totalSavings + +this.state.savingValueChange;

      if (newSavingsValue >= 0) {
        userSavingsRef.update({ savings: newSavingsValue });
        _this.setState({
          totalSavings: newSavingsValue,
        });
      } else if (newSavingsValue < 0) {
        Alert.alert('Savings cannot be negative.');
      }
    } catch (e) {
      console.log(e);
    }
    this.toggleUpdateSavings();
  }

  toggleUpdateSavings() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);

    if (this.state.modalOffset === height * 0.30) {
      this.setState({
        modalOffset: 0,
      });
    } else {
      this.setState({
        modalOffset: height * 0.30,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Total Savings
          </Text>
          <TouchableOpacity>
            <Icon
              name="plus-circle"
              size={20}
              color={theme.accent}
              style={{ marginLeft: 10 }}
              onPress={this.toggleUpdateSavings.bind(this)}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.savings}>
          ${this.state.totalSavings}
        </Text>
        <View style={[styles.modal, { top: this.state.modalOffset }]}>
          <Text style={{ color: '#bdbdbd', fontSize: 17, margin: 0, fontFamily: 'OpenSans', fontWeight: '100' }}>
            Update Savings
          </Text>
          <TextInput
            placeholder="$"
            placeholderTextColor="white"
            style={{ textAlign: 'center', width: 50, height: 40, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,.2)', margin: 10, color: 'white' }}
            onChangeText={savingValueChange => this.setState({ savingValueChange })}
            value={this.state.savingValueChange}
          />
          <TouchableOpacity
            style={{ backgroundColor: 'black', width: width * 0.2, padding: 10, margin: 10, borderRadius: 10, alignItems: 'center' }}
            onPress={this._updateSavings.bind(this)}
          >
            <Text style={{ color: theme.accent, fontFamily: 'OpenSans' }}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={this.toggleUpdateSavings.bind(this)}
          >
            <Text style={{ color: 'white', fontFamily: 'OpenSans' }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  modal: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.8)',
  },
});
