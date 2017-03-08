import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class GoalsSnapshot extends Component{

  constructor(){
    super();
    this.state = {

    };
  }

 render() {
       return (
         <TouchableOpacity style={styles.section}>
           <Text style={{fontFamily: 'OpenSans', fontWeight: '900', fontSize: 20, color: '#1de9b6', marginBottom: 10}}>
             Goals
           </Text>
           <TouchableOpacity
             style={{ height: 40, marginRight: 20, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 20, backgroundColor: '#eeeeee' }}
             >
             <View style={{flex: 1, backgroundColor: '#4527a0', borderRadius: 20, width: 0 }}></View>
             <Text style={{backgroundColor: 'transparent', position: 'absolute', top: 5, left: 110, texttAlign: 'center', fontSize: 20, fontWeight: '900', color: '#00bfa5'}}>
              Japan Trip
             </Text>
           </TouchableOpacity>
           <TouchableOpacity
             style={{ height: 40, marginRight: 20, marginLeft: 20, marginTop: 10, borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 20, backgroundColor: '#eeeeee' }}
            >
             <View style={{flex: 1, backgroundColor: '#4527a0', borderRadius: 20, width: 0 }}></View>
             <Text style={{backgroundColor: 'transparent', position: 'absolute', top: 5, left: 110, texttAlign: 'center', fontSize: 20, fontWeight: '900', color: '#00bfa5'}}>
              Burning Man
             </Text>
           </TouchableOpacity>
         </TouchableOpacity>
         )
       }
     }

 const styles = StyleSheet.create({
   section: {
       flex: 1,
       borderColor: 'red',
       marginTop: 5,
       borderWidth: 0,
       backgroundColor: 'white',
   }
 });
