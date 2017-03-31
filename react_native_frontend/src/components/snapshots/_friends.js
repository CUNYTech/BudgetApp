import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

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
          <Image
            style={styles.icon}
            source={{ uri: 'https://static.pexels.com/photos/343717/pexels-photo-343717.jpeg' }}
          />
          <Text style={styles.friendList}> {element.displayName} </Text>
          <Text style={styles.friendList}> 400 pts </Text>
        </View>,
      );
      i += 1;
    });

    return (
      <View style={styles.friendSnap}>
        <TouchableOpacity style={styles.button} onPress={this.navFriend.bind(this)}>
          <Text style={styles.headerText}>
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
    backgroundColor: 'black',
    borderColor: '#424242',
    borderBottomWidth: 1,
    borderTopWidth: 1,

  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  friendList: {
    color: theme.text,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans',
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.accent,
    overflow: 'hidden',
  },
  headerText: {
    marginLeft: 10,
    marginTop: 1,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#bdbdbd',
  },
});
