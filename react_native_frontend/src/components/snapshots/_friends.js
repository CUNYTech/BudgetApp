import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FriendsSnapshot extends Component {

  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  componentDidMount() {
    this.setFriends();
  }

  async setFriends() {
    try {
      const _this = this;
      await this.props.Firebase.auth().currentUser;

      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userFriendsRef = ref.child('userReadable/userFriends').child(uid);
      userFriendsRef.orderByKey().once('value').then((snap) => {
        const friendList = [];
        snap.forEach((snapshot) => {
          friendList.push({ displayName: snapshot.val().displayName, uid: snapshot.val().uid });
        });
        return friendList;
      }).then((value) => {
        if ((value.length > 0)) {
          _this.setState({
            friends: value,
          });
        } else {
          Alert.alert('Please add some friends!');
          _this.setState({
            friends: [],
          });
        }
      });
    } catch (e) {
      console.log(error);
    }
  }

  navFriend() {
    Actions.friends();
  }

  render() {
    const friends = [];
    let i = 0;
    this.state.friends.forEach((element) => {
      friends.push(
        <View key={i} style={{ alignItems: 'center', margin: 10 }}>
          <Icon name="user-circle-o" size={50} style={styles.icon} />
          <Text style={ styles.friendList }> {element.displayName} </Text>
          <Text style={ styles.friendList }> 400 pts </Text>
        </View>,
      );
      i += 1;
    });

    return (
      <View style={styles.friendSnap}>
        <TouchableOpacity style={ styles.button } onPress={this.navFriend.bind(this)}>
          <Text style={ styles.headerText }>
          FRIENDS
        </Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { friends }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friendSnap: {
    flex: 0,
    marginTop: 2,
    backgroundColor: 'white',
    borderColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  button : {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  friendList : {
    color: '#424242',
    fontSize: 10,
    fontWeight: 'bold'
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 0,
    overflow: 'hidden',
    color:"#e0e0e0",
  },
  headerText : {
    marginLeft: 10,
    marginTop: 1,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#424242',
  },
});
