import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BudgetSnapshot, GoalsSnapshot, FriendsSnapshot, PointsSnapshot } from '../components';
import { getPlatformValue } from '../utils';

const { height, width } = Dimensions.get('window');

const theme = {
  accent: '#ffc107',
  bg: 'black',
  text: 'white',
  font: 'OpenSans',
};

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0),
      animating: true,
      opacity: 1,
    };
  }

  componentDidMount() {
    this.setToggleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  setToggleTimeout() {
    this._timer = setTimeout(() => {
      this.setState({
        animating: !this.state.animating,
        opacity: 0,
      });
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1 },
      ).start();
      this.setToggleTimeout();
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={'#ffc107'}
          animating={this.state.animating}
          style={{ position: 'absolute', height, width, backgroundColor: '#212121' }}
          size="large"
        />
        <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim, backgroundColor: 'white' }}>
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
            <Icon name="diamond" size={20} color={theme.accent} />
          </View>
          <PointsSnapshot Firebase={this.props.Firebase} />
          <FriendsSnapshot Firebase={this.props.Firebase} />
          <GoalsSnapshot Firebase={this.props.Firebase} />
          <BudgetSnapshot Firebase={this.props.Firebase} />
        </Animated.View>
      </View>
    );
  }
     }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  header: {
    paddingTop: getPlatformValue('android', 25, 20),
    flex: 0,
    flexDirection: 'row',
    height: 60,
    backgroundColor: theme.bg,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#e0e0e0',
  },
});
