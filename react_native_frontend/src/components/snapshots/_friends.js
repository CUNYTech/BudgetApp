import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FriendsSnapshot extends Component{

  constructor(){
    super();
    this.state = {
    };
  }

  navFriend() {
    Actions.friends()
  }

 render() {
   const friends = [];
   for (let i = 0; i <= 10; i++) {
     friends.push(
       <View key={i} style={{alignItems: 'center', margin: 10}}>
         <Icon name="user-circle-o" size={50} color="#e0e0e0" style={styles.icon} />
         <Text style={{color: '#424242', fontSize: 10, fontWeight: 'bold'}}>Tom</Text>
         <Text style={{fontSize: 10, fontWeight: 'bold'}}>400 pts</Text>
       </View>
     )
    }

  return (
    <View style={styles.friendsSection}>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-start'}} onPress={this.navFriend.bind(this)}>
        <Text style={{marginLeft: 10, marginTop: 1,fontFamily: 'OpenSans', fontSize: 17, color: '#424242',}}>
          FRIENDS
        </Text>
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
       marginTop: 2,
       backgroundColor: 'white',
       borderColor: '#e0e0e0',
       borderBottomWidth: 1,
   },
   icon: {
     width: 50,
     height: 50,
     backgroundColor: 'transparent',
     borderWidth: 1,
     borderColor: 'transparent',
     borderRadius: 0,
     overflow: 'hidden'
   }
 });
