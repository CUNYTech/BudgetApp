import React, { Component } from 'react';
import { View, Alert ,Text, StyleSheet, ScrollView, TouchableOpacity,
    TextInput, LayoutAnimation, Platform } from 'react-native';
import { BackgroundWrapper } from '../components';
import { getPlatformValue } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase'

let CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

export default class Friends extends Component{

  constructor(){
    super();
    this.state = {
      friends: [],
      friendChange: '',
      addFriendOffset: -200,
      searchBarOffset: 0,
      searchBarOffsetWrapper: 0,
      searchResults: []
    };
  }


  componentDidMount() {
    this.props.hideSideMenu();
    this.setFriends();
  }


  componentWillMount(){
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


  async _updateFriends() {

    try{
      let ref = this.props.Firebase.database().ref();
      let user = this.props.Firebase.auth().currentUser;
      let uid = user.uid;
      let userFriendsRef = ref.child('userReadable/userFriends').child(uid);

      let newFriend = this.state.friendsChange;
      let newFriends = [...this.state.friends, newFriend];

      let _this = this;

      if (newFriends.length > 0) {
        // let curentUser = this.props.Firebase.database().ref().child(uid);
        userFriendsRef.update({ friends: newFriends });
        userFriendsRef.once('value').then(function(snap){
          let updatedValue = snap.val().friends;
          return updatedValue
        }).then(function(value){
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          _this.setState({
            friends: value
          })
        })
      }
    }
    catch(e){
      console.log(e);
    }
    this.showAddFriend()
  }

  _buttonAddFriend() {
    this.showAddFriend()
  }

  showAddFriend() {
    let offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.addFriendOffset == -200) {
      this.setState({ addFriendOffset: offSet }) //Set to 0 for android
    } else {
      this.setState({
        addFriendOffset: -200,
        friendChange: ''
      })
    }
  }

//USERS FRIENDS TO BE RENDERED ON PAGE WILL BE QUERY OF THE SORT BELOW

// let payload=[];  // RESULT OF SEARCH INDEX or USERS FRIENDS TO BE THROWN TO RENDER

// _updateFriends = () => {
//   userFriends.child('2/friends').once('value').then(function(snap) {
//     snap.forEach(function(snapshot){
//       payload.push([snapshot.val().displayName, snapshot.val().uid]);
//     }); return Promise.all(payload);
//   }).then(function(payload){
//       return payload
//     })
   //  .then(function(payload){  //PAYLOAD WILL HOLD UIDS
   //        console.log(payload);
   //     })


   //  });
  // }

  _searchUsers(searchString) {
    console.log(searchString);
    let ref = firebase.database().ref('/people');
    let userRef = ref.child('userPoints');
    let userFriends = ref.child('userFriends');
    let peopleRef = ref.child('/people');
    let people = [];
    let _this = this;

    if (searchString == '') {
      this.setState({
        searchResults: []
      })
    } else {
      ref.orderByChild('displayName').startAt(searchString).limitToFirst(10).once('value')
        .then(function(snap){
          snap.forEach(function(snapshot){
              people.push({'displayName':  snapshot.val().displayName, 'uid': snapshot.val().uid})
          });
          return Promise.all(people)
        }).then(function(people){
          let userId = Object.keys(people);
          userId.forEach(userId => {
            let name = people[userId].displayName;
            if (!name.startsWith(searchString)){
              delete people[userId];
            }
          });
          let results_without_empties = [];
          people.forEach( item => {
            if (item != '') {
              results_without_empties.push(item)
            }
          });
          _this.setState({
            searchResults: results_without_empties
          })
        })
      }
    }

  _addFriend(displayName, uid) {
    let ref = firebase.database().ref();
    let currentUid = firebase.auth().currentUser.uid;
    let userFriendsRef = ref.child('userReadable/userFriends');

    userFriendsRef.child(currentUid+ '/'+uid).set({
      displayName: displayName,
      uid: uid
    });
    this.setFriends();
  }

  showSearchBar() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    if (this.state.searchBarOffset != 0) {
      this.setState({
        searchBarOffset: 0,
        searchBarOffsetWrapper: 0,
        searchResults: []
      })
    } else {
      this.setState({
        searchBarOffset: 250,
        searchBarOffsetWrapper: 300
      })
    }
  }

  renderFriends() {
    let users = [];
    let i = 1;
    this.state.friends.forEach(function(element){
      users.push(
        <TouchableOpacity key={i} activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: .5, borderColor: '#e0e0e0', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5}}>
          <Icon name='user-circle-o'
            size={50}
            color='#e0e0e0'
            style={{flex: 0, alignItems:'flex-end', borderRadius: 25, borderColor: 'transparent', borderWidth: 1, width: 50, height: 50, overflow: 'hidden', backgroundColor: 'white'}} />
          <Text style={{flex: 2, textAlign: 'left', color: '#424242'}} > {element.displayName} </Text>
          <View style={{flex: 1}}>
            <Text style={{flex: 1, textAlign: 'right', color: '#424242'}} >200pts</Text>
            <Text style={{flex: 1, textAlign: 'right', color: '#a5d6a7'}} >Level 1</Text>
          </View>
        </TouchableOpacity>
      )
      i += 1
    });
    return users
  }

  renderSearchResults() {
    let _this = this
    let search = [];
    let i = 0
    this.state.searchResults.forEach(function(element){
      search.push(
        <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#e0e0e0', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5}}>
          <Icon name='user-circle-o' size={50} color='#e0e0e0' style={{ alignItems:'flex-end', borderRadius: 25, borderColor: 'transparent', borderWidth: 1, width: 50, height: 50, overflow: 'hidden', backgroundColor: 'transparent'}} />
          <Text style={{ textAlign: 'left', color: '#42a5f5', fontSize: 12, position: 'absolute', top: 23, left: 50}}> (pending)</Text>
          <Text style={{ textAlign: 'left', color: 'white'}} > {element.displayName} </Text>
          <TouchableOpacity onPress={_this._addFriend.bind(_this, element.displayName, element.uid)} style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
            <Icon name='plus-circle' size={25} color='white' style={{backgroundColor: 'transparent'}}/>
          </TouchableOpacity>
        </View>
      )
      i += 1
    });
    return search;
  }

  render() {
    let refresh = true
    const search = this.renderSearchResults.bind(this)();
    const users = this.renderFriends.bind(this)();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name='bars'
            size={30}
            color='white'
            onPress={this.props.sideMenu}/>
          </TouchableOpacity>
          <Text style={{
            fontSize: 25,
            textAlign: 'center',
            width: 250,
            color: 'white',
            fontWeight: '300',
            marginBottom: 5
          }}>
            FRIENDS
          </Text>
          <TouchableOpacity onPress={this.showSearchBar.bind(this)} >
            <Icon name='search' size={20} color='white' />
          </TouchableOpacity>
          <View style={{height: 30, justifyContent: 'center', width: this.state.searchBarOffsetWrapper, position: 'absolute', right: 10, top: 22, flexDirection: 'row', backgroundColor: '#424242'}}>
            <TextInput
              placeholder='Search for friends'
              autoCapitalize='none'
              style={{backgroundColor: '#e0e0e0', width: this.state.searchBarOffset, height: 30, borderRadius: 5, fontSize: 12}}
              onChangeText={this._searchUsers.bind(this)} />
            <TouchableOpacity activeOpacity={.7} onPress={this.showSearchBar.bind(this)} >
              <Text style={{padding: 6, color: 'white', marginLeft: 2}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{position: 'absolute', top: 60, left: 0, right: 0, zIndex: 999999, backgroundColor: 'rgba(0,0,0,.8)'}}>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
            { search }
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
            { users }
          </ScrollView>
        </View>
      </View>
    )
  }
}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
   },
   header: {
       paddingTop: getPlatformValue('android', 25, 20),
       flex: 0,
       flexDirection: 'row',
       height: 60,
       backgroundColor: '#424242',
       justifyContent: 'space-around',
       alignItems: 'center',
       borderBottomWidth: 1,
       borderColor: '#424242'
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
       justifyContent: 'center'
    }
 });
