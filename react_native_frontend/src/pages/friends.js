import React, {Component, PropTypes} from 'react';
import {
    View, Alert ,Text, Image, StyleSheet, Animated, InteractionManager, ScrollView, TouchableOpacity, TextInput, LayoutAnimation, Platform
} from 'react-native';
import {Logo, Heading, BackgroundWrapper, AlertStatus, BudgetSnapshot, GoalsSnapshot, FriendsSnapshot, PointsSnapshot} from '../components';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bar } from 'react-native-pathjs-charts'

var CustomLayoutAnimation = {
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
    };
  }


  componentDidMount() {
    this.props.hideSideMenu()
  }


  componentWillMount(){
    this.setFriends();

  }

  async setFriends(){
    try{
      const _this = this
      await this.props.Firebase.auth().currentUser;

      var uid =  this.props.Firebase.auth().currentUser.uid;
      var ref = this.props.Firebase.database().ref();
      var userFriendsRef = ref.child('userReadable/userFriends').child(uid);

      userFriendsRef.once('value').then(function(snap){
        var friendList = snap.val().friends;
        return friendList
      }).then(function(value){
        if((value.length > 0) ){
          _this.setState({
            friends: value
          })
        } else {
          Alert.alert('Please add some friends!')
          _this.setState({
            friends: ['billy']
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
      var ref = this.props.Firebase.database().ref();
      var user = this.props.Firebase.auth().currentUser;
      var uid = user.uid;
      var userFriendsRef = ref.child('userReadable/userFriends').child(uid);

      const newFriend = this.state.friendsChange
      const newFriends = [...this.state.friends, newFriend]

      const _this = this

      if (newFriends.length > 0) {
        // var curentUser = this.props.Firebase.database().ref().child(uid);
        userFriendsRef.update({ friends: newFriends })
        userFriendsRef.once('value').then(function(snap){
          var updatedValue = snap.val().friends;
          return updatedValue
        }).then(function(value){
          LayoutAnimation.configureNext(CustomLayoutAnimation)
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

  _addFriend() {
    this.showAddFriend()
  }

  showAddFriend() {
    var offSet = (Platform.OS === 'ios') ? 220 : 0;
    LayoutAnimation.configureNext(CustomLayoutAnimation)
    if (this.state.addFriendOffset == -200) {
      this.setState({ addFriendOffset: offSet }) //Set to 0 for android
    } else {
      this.setState({
        addFriendOffset: -200,
        friendChange: ''
      })
    }
  }


 render() {
   var i = 1
   const friends = []
   this.state.friends.forEach(function(element) {
     friends.push(
       <View key={i} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 1, borderColor: 'transparent', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5}}>
         <Icon name="user-circle-o" size={50} color="#e0e0e0" style={{ borderRadius: 25, borderColor: 'transparent', borderWidth: 1, width: 50, height: 50, overflow: 'hidden', backgroundColor: 'white'}} />
         <Text style={{flex: 3, textAlign: 'center', color: '#424242'}}>{ element }</Text>
         <View style={{flex: 1}}>
           <Text style={{flex: 1, textAlign: 'center', color: '#424242'}} >200pts</Text>
           <Text style={{flex: 1, textAlign: 'center', color: '#a5d6a7'}} >Level 1</Text>
         </View>
       </View>
     )
     i+=1
   })

    const friends_two = []
    for (var x = 10; x <= 12; x++) {
      friends_two.push(
        <View key={x} style={{alignItems: 'center', margin: 10, marginTop: 5, marginBottom: 20}}>
            <Icon name="user-circle-o" size={40} color="#e0e0e0" style={{overflow: 'hidden', borderRadius: 0, backgroundColor: 'transparent', width: 40, height: 43,}} />
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{padding: 5}}>
            <Icon name='check-circle' color={'#424242'} size={25}/>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 5}}>
            <Icon name='times-circle' color={'#ef5350'} size={25}/>
          </TouchableOpacity>
          </View>
        </View>
      )
     }
       return (
          <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon name="bars"
              size={30}
              color="white"
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
            <Icon name="diamond" size={20} color="pink" />
          </View>
          <View style={{flex: 0, backgroundColor: '#a5d6a7', borderTopWidth: 1, borderColor: '#e0e0e0'}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{backgroundColor: 'transparent'}}>
              { friends_two }
            </ScrollView>
          </View>
          <View style={{flex: 1}}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
              { friends }
            </ScrollView>
          </View>

            <TouchableOpacity style={styles.addFriend} activeOpacity={.7} onPress={this.showAddFriend.bind(this)}>
              <Icon name="plus-circle" size={50} color="white" style={{backgroundColor: 'transparent'}}/>
            </TouchableOpacity>
            <View style={{
              position: 'absolute',
              bottom: this.state.addFriendOffset,
              width: 300,
              height: 200,
              left: 35,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: 'black',
              backgroundColor: 'white',
              justifyContent: 'center',
            }}>
              <Text style={{textAlign: 'center', color: 'black', fontFamily: 'OpenSans' }}>
                ADD FRIENDS
              </Text>
              <Text style={{color: 'red', fontSize: 10, textAlign: 'center'}}>user not found</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
                <Text style={{color: 'white',fontSize: 35}}>
                </Text>
                <View style={{borderBottomWidth: 1, borderColor: '#e0e0e0'}}>
                  <TextInput
                    style={{height: 40, width: 150, borderColor: 'white', backgroundColor: 'white', borderWidth: 1, textAlign: 'left'}}
                    onChangeText={(friendChange) => this.setState({friendChange})}
                    value={""+this.state.friendChange+""}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={this._addFriend.bind(this)}
                style={styles.addFriendButton}
              >
                <Text style={{textAlign: 'center', color: 'white' }}>
                  ADD FRIEND
                </Text>
              </TouchableOpacity>
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
