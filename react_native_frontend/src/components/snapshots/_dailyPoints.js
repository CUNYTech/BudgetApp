import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';

const { height, width } = Dimensions.get('window');

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

export default class PointsSnapshot extends Component {

  constructor() {
    super();
    this.state = {
      dailyPoints: 0,
      CurrentPoints: 0,
    };
  }

  componentWillMount() {
    this.setPoints();
  }

  navPoints() {
    Actions.points();
  }

  async setPoints() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userPointsRef = ref.child('userReadable/userPoints').child(uid);
      const userDailyPointsRef = ref.child('userReadable/userDailyPoints').child(uid);

      userDailyPointsRef.once('value').then((snap) => {
        const dailyPoints = snap.val().points;
        this.setState({ dailyPoints });
      });

      userPointsRef.once('value').then((snap) => {
        const points = snap.val().points;
        return points;
      })
      .then((points) => {
        this.setState({ CurrentPoints: points });
      });
    } catch (e) {
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.navPoints.bind(this)} style={styles.pointSection}>
        <View style={styles.button}>
          <Text style={styles.headerText}>
            DAILY POINTS
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 17 }}>Total Points</Text>
          <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>{this.state.CurrentPoints}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 13 }}>Local Rank</Text>
            <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>2</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 13 }}>Global Rank</Text>
            <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>10</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 17 }}>Earned Today</Text>
          <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>{this.state.dailyPoints}</Text>
        </View>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
          <StockLine data={graphData} options={options} xKey="x" yKey="y" />
        </ScrollView> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  pointSection: {
    width: width * 0.51,
    backgroundColor: 'black',
  },
  button: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerText: {
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#e0e0e0',
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    width: null,
    height: null,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  bgFilter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
