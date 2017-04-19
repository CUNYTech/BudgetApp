import React, { Component } from 'react';
import { Dimensions, View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

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
          friendList.push({ displayName: snapshot.val().displayName, uid: snapshot.val().uid, photoUrl: snapshot.val().photoUrl });
        });
        return friendList;
      }).then((value) => {
        if ((value.length > 0)) {
          _this.setState({
            friends: value,
          });
        } else {
          _this.setState({
            friends: [],
          });
        }
      });
    } catch (e) {
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
            source={{ uri: element.photoUrl }}
          />
          <Text style={styles.friendList}> {element.displayName} </Text>
          <Text style={styles.friendList}> 400 pts </Text>
        </View>,
      );
      i += 1;
    });

    let content = '';
    if (friends.length === 0) {
      content = (<Text style={{ flex: 1, padding: 30, textAlign: 'center', fontFamily: 'OpenSans', color: theme.accent, opacity: 0.9, fontSize: 12 }}>
          No Friends Yet. Add Some Friends!
        </Text>);
    } else {
      content = (<ScrollView horizontal showsHorizontalScrollIndicator={false}>
        { friends }
      </ScrollView>);
    }

    return (
      <View style={styles.friendSnap}>
        <TouchableOpacity onPress={this.navFriend.bind(this)}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              FRIENDS
            </Text>
          </View>
        </TouchableOpacity>
        { content }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friendSnap: {
    flex: 0,
    height: height * 0.20,
    backgroundColor: 'black',
  },
  friendList: {
    color: theme.text,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans',
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: theme.accent,
    overflow: 'hidden',
  },
  headerText: {
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#e0e0e0',
  },
  header: {

    padding: 10,

    borderTopWidth: 0.5,
    borderColor: '#424242',
  },
});
