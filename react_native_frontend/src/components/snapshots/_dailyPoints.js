import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StockLine } from 'react-native-pathjs-charts';
import { Actions } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';

const { height, width } = Dimensions.get('window');

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

const graphData = [
  [{
    x: 0,
    y: 17782,
  }, {
    x: 1,
    y: 28497,
  }, {
    x: 2,
    y: 27128,
  }, {
    x: 3,
    y: 33413,
  }, {
    x: 4,
    y: 48257,
  }, {
    x: 5,
    y: 40579,
  }, {
    x: 6,
    y: 52893,
  }, {
    x: 7,
    y: 60663,
  }, {
    x: 8,
    y: 55715,
  }, {
    x: 9,
    y: 70305,
  }, {
    x: 10,
    y: 88592,
  }],
];


const options = {
  width: width * 0.5,
  height: height * 0.3,
  margin: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  color: theme.accent,
  gutter: -0.5,
  animate: {
    type: 'twoByTwo',
    duration: 200,
    fillTransition: 3,
  },
  axisX: {
    showAxis: true,
    showLines: false,
    showLabels: true,
    showTicks: false,
    zeroAxis: false,
    orient: 'bottom',
    label: {
      marginBottom: 100,
      fontFamily: 'OpenSans',
      fontSize: 12,
      fontWeight: true,
      fill: 'black',
    },
  },
  axisY: {
    showAxis: false,
    showLines: false,
    showLabels: false,
    showTicks: false,
    zeroAxis: false,
    orient: 'left',
    label: {
      fontFamily: 'OpenSans',
      fontSize: 8,
      fontWeight: true,
      fill: 'black',
    },
  },
};

export default class PointsSnapshot extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  navPoints() {
    Actions.points();
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
          <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>200</Text>
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
          <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>200</Text>
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
