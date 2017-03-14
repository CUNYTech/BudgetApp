import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bar } from 'react-native-pathjs-charts'

const graphData = [
  [{"v": 49, "name": "1/18"},
  {"v": 42, "name": "1/19"},
  {"v": 69, "name": "1/21"},
  {"v": 62, "name": "1/22"},
  {"v": 29, "name": "1/23"},
  {"v": 15, "name": "1/24"},
  {"v": 35, "name": "1/25"},
  {"v": 42, "name": "1/26"},
  {"v": 69, "name": "1/27"},
  {"v": 62, "name": "1/28"},
  {"v": 29, "name": "1/30"},
  {"v": 15, "name": "2/1"},
  {"v": 35, "name": "2/2"},
  {"v": 42, "name": "2/3"},
  {"v": 69, "name": "2/4"},
  {"v": 62, "name": "2/4"},
  {"v": 29, "name": "2/5"},
  {"v": 15, "name": "2/6"},
  {"v": 35, "name": "2/7"},
  {"v": 42, "name": "2/8"},
  {"v": 69, "name": "2/9"},
  {"v": 62, "name": "2/10"},
  {"v": 29, "name": "2/11"},
  {"v": 15,"name": "2/12"},
  {"v": 35, "name": "2/13"}]
]

const options = {
  width: 1040,
  height: 100,
  margin: {
    top: 20,
    left: 0,
    bottom: 90,
    right: 0
  },
  color: '#bdf5e4',
  gutter: -.5,
  animate: {
    type: 'oneByOne',
    duration: 200,
    fillTransition: 3
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
      fill: 'white'
    }
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
      fill: 'white'
    }
  }
}



export default class PointsSnapshot extends Component{

  constructor(){
    super();
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.section}>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={{textAlign: 'left',marginLeft:6,fontFamily: 'OpenSans', fontSize: 17, color: 'white'}}>
            DAILY POINTS
          </Text>
          {/* <Icon style={{marginRight: 4, marginTop: 4}} name="chevron-right" size={20} color="#fff176" /> */}
        </TouchableOpacity>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
          <Bar data={graphData} options={options} accessorKey='v'/>
        </ScrollView>
      </View>
    )
  }
}

 const styles = StyleSheet.create({
   section: {
       flex: 1,
       borderColor: 'red',
       marginTop: .5,
       borderWidth: 0,
       backgroundColor: 'black',
   }
 });
