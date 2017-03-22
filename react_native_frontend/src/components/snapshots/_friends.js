import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FriendsSnapshot extends Component{

  constructor(){
    super();
    this.state = {
      friends: []
    };
  }


  componentDidMount() {
    this.setFriends();
  }

  async setFriends(){
    try{
      const _this = this;
      await this.props.Firebase.auth().currentUser;

      let uid =  this.props.Firebase.auth().currentUser.uid;
      let ref = this.props.Firebase.database().ref();
      let userFriendsRef = ref.child('userReadable/userFriends').child(uid);
      userFriendsRef.orderByKey().once('value').then(function(snap){
        let friendList = [];
        snap.forEach(function(snapshot){
          friendList.push({'displayName': snapshot.val().displayName, 'uid': snapshot.val().uid })
        });
        return friendList
      }).then(function(value){
        if((value.length > 0) ){
          _this.setState({
            friends: value
          })
        } else {
          Alert.alert('Please add some friends!');
          _this.setState({
            friends: []
          })
        }
      })
    }
    catch(e){
      console.log(error);
    }
  }

  navFriend() {
    Actions.friends()
  }

 render() {
   const friends = [];
   let i = 0
    this.state.friends.forEach(function(element) {
      friends.push(
        <View key={i} style={{alignItems: 'center', margin: 10}}>
          <Icon name="user-circle-o" size={50} color="#e0e0e0" style={styles.icon} />
          <Text style={{color: '#424242', fontSize: 10, fontWeight: 'bold'}}>{element.displayName}</Text>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>400 pts</Text>
        </View>
      )
      i+=1
    })

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
