import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';



export default class FriendsSnapshot extends Component{

  constructor(){
    super();
    this.state = {

    };
  }

 render() {
   const friends = []
   for (var i = 0; i <= 10; i++) {
     friends.push(
       <View key={i} style={{alignItems: 'center', margin: 10}}>
         <Icon name="user" size={50} color="#e0e0e0" style={styles.icon} />
         <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>Tom</Text>
         <Text style={{fontSize: 10, fontWeight: 'bold'}}>400 pts</Text>
       </View>
     )
    }
  return (
    <View style={styles.friendsSection}>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={{marginRight: 282, marginTop: 1,fontFamily: 'OpenSans', fontSize: 17, color: 'white',}}>
          FRIENDS
        </Text>
        <Icon style={{marginRight: 4, marginTop: 4}} name="chevron-right" size={20} color="#fff176" />
      </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        { friends }
      </ScrollView>
    </View>
    )
  }
}

 const styles = StyleSheet.create({
   friendsSection: {
       flex: 0,
       marginTop: .5,
       backgroundColor: 'black',
       borderColor: 'red',
       borderWidth: 0,
   },
   icon: {
     width: 40,
     height: 40,
     backgroundColor: '#bdbdbd',
     borderWidth: 1,
     borderColor: 'black',
     borderRadius: 20,
     overflow: 'hidden'
   }
 });
