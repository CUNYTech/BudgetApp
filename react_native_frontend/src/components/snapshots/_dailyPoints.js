import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StockLine } from 'react-native-pathjs-charts';
import { Actions } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';

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
  width: getPlatformValue('android', 601, 375),
  height: getPlatformValue('android', 275, 175),
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
      <View style={styles.pointSection}>
        <Image
          style={styles.bg}
          source={{ uri: 'http://www.ilikewallpaper.net/ipad-wallpapers/download/7702/Circle-Pattern-ipad-wallpaper-ilikewallpaper_com.jpg' }}
        >
          <View style={styles.bgFilter} />
        </Image>
        <TouchableOpacity onPress={this.navPoints.bind(this)} style={styles.button}>
          <Text style={styles.headerText}>
            DAILY POINTS
          </Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
          <StockLine data={graphData} options={options} xKey="x" yKey="y" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pointSection: {
    flex: 1,
    marginTop: 0,
    borderWidth: 0,
    backgroundColor: '#424242',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerText: {
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#bdbdbd',
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
