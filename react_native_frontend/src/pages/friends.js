import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, LayoutAnimation, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import { getPlatformValue } from '../utils';

const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const theme = {
  accent: '#ffc107',
  bg: 'black',
  text: 'white',
  font: 'OpenSans',
};

export default class Friends extends Component {

  constructor() {
    super();
    this.state = {
      friends: [],
      friendChange: '',
      addFriendOffset: -200,
      searchBarOffset: 0,
      searchBarOffsetWrapper: 0,
      searchResults: [],
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
      console.log(e);
    }
  }


  async _updateFriends() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userFriendsRef = ref.child('userReadable/userFriends').child(uid);

      const newFriend = this.state.friendsChange;
      const newFriends = [...this.state.friends, newFriend];

      const _this = this;

      if (newFriends.length > 0) {
        // let curentUser = this.props.Firebase.database().ref().child(uid);
        userFriendsRef.update({ friends: newFriends });
        userFriendsRef.once('value').then((snap) => {
          const updatedValue = snap.val().friends;
          return updatedValue;
        }).then((value) => {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          _this.setState({
            friends: value,
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
    this.showAddFriend();
  }

  _buttonAddFriend() {
    this.showAddFriend();
  }

  showAddFriend() {
    const offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addFriendOffset === -200) {
      this.setState({ addFriendOffset: offSet }); // Set to 0 for android
    } else {
      this.setState({
        addFriendOffset: -200,
        friendChange: '',
      });
    }
  }

  _searchUsers(searchString) {
    console.log(searchString);
    const ref = firebase.database().ref('/people');
    const userRef = ref.child('userPoints');
    const userFriends = ref.child('userFriends');
    const peopleRef = ref.child('/people');
    const people = [];
    const _this = this;

    if (searchString === '') {
      this.setState({
        searchResults: [],
      });
    } else {
      ref.orderByChild('displayName').startAt(searchString).limitToFirst(10).once('value')
        .then((snap) => {
          snap.forEach((snapshot) => {
            people.push({ displayName: snapshot.val().displayName, uid: snapshot.val().uid });
          });
          return Promise.all(people);
        }).then((people) => {
          const userId = Object.keys(people);
          userId.forEach((userId) => {
            const name = people[userId].displayName;
            if (!name.startsWith(searchString)) {
              delete people[userId];
            }
          });
          const resultsWithoutEmpties = [];
          people.forEach((item) => {
            if (item != '') {
              resultsWithoutEmpties.push(item);
            }
          });
          _this.setState({
            searchResults: resultsWithoutEmpties,
          });
        });
    }
  }

  _addFriend(displayName, uid) {
    const ref = firebase.database().ref();
    const currentUid = firebase.auth().currentUser.uid;
    const userFriendsRef = ref.child('userReadable/userFriends');

    userFriendsRef.child(`${currentUid}/${uid}`).set({
      displayName,
      uid,
    });
    this.setFriends();
    this.showSearchBar();
  }

  showSearchBar() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.searchBarOffset !== 0) {
      this.setState({
        searchBarOffset: 0,
        searchBarOffsetWrapper: 0,
        searchResults: [],
      });
    } else {
      this.setState({
        searchBarOffset: 260,
        searchBarOffsetWrapper: 320,
      });
    }
  }

  renderFriends() {
    const users = [];
    let i = 1;
    this.state.friends.forEach((element) => {
      users.push(
        <TouchableOpacity key={i} activeOpacity={0.8} style={{ backgroundColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 0.5, borderColor: '#424242', paddingTop: 5, paddingBottom: 5 }}>
          <Icon
            name="user-circle-o"
            size={50}
            color="rgba(0,0,0,.5)"
            style={{ marginLeft: 10, flex: 0, alignItems: 'flex-end', borderRadius: 25, borderColor: '#ffc107', borderWidth: 1, width: 50, height: 50, overflow: 'hidden', backgroundColor: 'white' }}
          />
          <Text style={{ flex: 2, textAlign: 'left', color: 'white' }} > {element.displayName} </Text>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ flex: 1, textAlign: 'right', color: 'white' }} >200pts</Text>
            <Text style={{ flex: 1, textAlign: 'right', color: '#ffc107' }} >Level 1</Text>
          </View>
        </TouchableOpacity>,
      );
      i += 1;
    });
    return users;
  }

  renderSearchResults() {
    const _this = this;
    const search = [];
    let i = 0;
    this.state.searchResults.forEach((element) => {
      search.push(
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#e0e0e0', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5 }}>
          <Icon name="user-circle-o" size={50} color="black" style={{ alignItems: 'flex-end', borderRadius: 25, borderColor: 'transparent', borderWidth: 1, width: 50, height: 50, overflow: 'hidden', backgroundColor: 'transparent' }} />
          <Text style={{ textAlign: 'left', color: 'transparent', fontSize: 12, position: 'absolute', top: 23, left: 50 }}> (pending)</Text>
          <Text style={{ textAlign: 'left', color: 'black' }} > {element.displayName} </Text>
          <TouchableOpacity onPress={_this._addFriend.bind(_this, element.displayName, element.uid)} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Icon name="plus-circle" size={25} color="#ffc107" style={{ backgroundColor: 'transparent' }} />
          </TouchableOpacity>
        </View>,
      );
      i += 1;
    });
    return search;
  }

  render() {
    const refresh = true;
    const search = this.renderSearchResults.bind(this)();
    const users = this.renderFriends.bind(this)();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon
              name="bars"
              size={30}
              color="white"
              onPress={this.props.sideMenu}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              width: 250,
              color: 'white',
              fontWeight: '300',
              marginBottom: 5,
            }}
          >
            FRIENDS
          </Text>
          <TouchableOpacity onPress={this.showSearchBar.bind(this)} >
            <Icon name="search" size={20} color="white" />
          </TouchableOpacity>
          <View style={{ height: 30, justifyContent: 'center', width: this.state.searchBarOffsetWrapper, position: 'absolute', right: -5, top: 22, flexDirection: 'row', backgroundColor: '#424242' }}>
            <TextInput
              placeholder="Search for friends"
              autoCapitalize="none"
              style={{ backgroundColor: '#e0e0e0', width: this.state.searchBarOffset, height: 30, borderRadius: 5, fontSize: 12, paddingLeft: 5 }}
              onChangeText={this._searchUsers.bind(this)}
            />
            <TouchableOpacity activeOpacity={0.7} onPress={this.showSearchBar.bind(this)} >
              <Text style={{ padding: 6, color: 'white', marginLeft: 2 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ position: 'absolute', top: 60, left: 0, right: 0, zIndex: 999999, backgroundColor: '#616161' }}>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
            { search }
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
            { users }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  header: {
    paddingTop: getPlatformValue('android', 25, 20),
    flex: 0,
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#424242',
  },
  addFriend: {
    position: 'absolute',
    top: 75,
    right: 20,
  },
  addFriendButton: {
    height: 45,
    width: 200,
    backgroundColor: '#3949ab',
    borderRadius: 10,
    marginLeft: 55,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});
