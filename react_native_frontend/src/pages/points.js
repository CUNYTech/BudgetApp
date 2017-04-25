import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';

const { height, width } = Dimensions.get('window');

export default class Points extends Component {

  constructor() {
    super();
    this.state = {
      CurrentPoints: 0,
      dailyPoints: 0,
      userLocalRank: 0,
      userGlobalRank: 0,
      friends: 0,
    };
  }

  componentWillMount() {
    const uid = this.props.Firebase.auth().currentUser.uid;
    const _this = this;
    const storageRef = this.props.Firebase.storage().ref();
    const userName = this.props.Firebase.auth().currentUser.displayName;
    const ref = this.props.Firebase.database().ref();

    const peopleRef = ref.child('/people');
    peopleRef.child(userName).once('value').then((snap) => {
      if (snap.val().photoUrl) {
        return snap.val().photoUrl;
      }
      return 'https://static.pexels.com/photos/7613/pexels-photo.jpg';
    }).then((pic) => {
      this.setState({ chosenImage: pic });
    });

    _this.setState({ userName });
    this._localRank();
    this._getBoard();
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
            friends: value.length,
          });
        } else {
          _this.setState({
            friends: 0,
          });
        }
      });
    } catch (e) {
    }
  }

  async _getBoard() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const userRankingRef = ref.child('userReadable/userPoints');
      const leaderBoard = [];

      userRankingRef.orderByChild('points').once('value').then((snap) => {
        snap.forEach((snapshot) => {
          leaderBoard.push([snapshot.val().displayName, snapshot.val().points]);
        });
        return Promise.all(leaderBoard);
      })
      .then((leaderBoard) => {
        const newleaderBoard = leaderBoard.reverse();
        return newleaderBoard;
      })
      .then((newleaderBoard) => {
        const rankings = [];
        const ranks = Object.keys(newleaderBoard);
        ranks.forEach((ranked) => {
          const name = newleaderBoard[ranked][0];
          const rank = +ranked + 1;
          rankings.push([name, `${rank}`]);
        });
        return rankings;
      })
      .then((rankings) => {
        rankings.forEach((Rank) => {
          if (Rank[0] === user.displayName) {
            this.setState({ userGlobalRank: Rank[1] });
          }
        });
      });
    } catch (e) {
    }
  }

  async _localRank() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userFriendsRef = ref.child('userReadable/userFriends').child(uid);
      const userRankingRef = ref.child('userReadable/userPoints');
      const leaderBoard = [];

      userFriendsRef.orderByKey().once('value').then((snap) => {
        const friendList = [];
        snap.forEach((snapshot) => {
          friendList.push({ displayName: snapshot.val().displayName });
        });
        return friendList;
      })
      .then((friendList) => {
        userRankingRef.orderByChild('points').once('value').then((snap) => {
          snap.forEach((snapshot) => {
            leaderBoard.push([snapshot.val().displayName, snapshot.val().points]);
          });
          return Promise.all(leaderBoard);
        })
          .then((leaderBoard) => {
            const newleaderBoard = leaderBoard.reverse();
            return newleaderBoard;
          })
          .then((newleaderBoard) => {
            const friendRank = [];
            friendList.forEach((element) => {
              for (let i = 0; i < newleaderBoard.length; i++) {
                if ((newleaderBoard[i][0] === `${element.displayName}`)) {
                  friendRank.push([newleaderBoard[i][1], newleaderBoard[i][0]]);
                }
              }
            });
            newleaderBoard.forEach((element) => {
              if (element[0] === user.displayName) {
                friendRank.push([element[1], element[0]]);
              }
            });
            function sortNumber(a, b) {
              return b[0] - a[0];
            }
            const sortedFriends = friendRank.sort(sortNumber);
            const rankings = [];
            const ranks = Object.keys(friendRank);
            ranks.forEach((ranked) => {
              const name = sortedFriends[ranked][1];
              const rank = +ranked + 1;
              rankings.push([name, `${rank}`]);
            });
            return rankings;
          })
          .then((rankings) => {
            const localRank = 0;
            rankings.forEach((Rank) => {
              if (Rank[0] === user.displayName) {
                this.setState({ userLocalRank: Rank[1] });
              }
            });
          });
      });
    } catch (e) {
    }
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
            POINTS
          </Text>
          <Icon name="diamond" size={20} color="#ffc107" />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width, height: height * 0.25 }}>
          <Text style={{ marginLeft: 10, fontFamily: 'OpenSans', fontFamily: 'OpenSans', fontSize: 100, color: '#bdbdbd', fontFamily: 'OpenSans', fontWeight: '100', textAlign: 'left' }}>{this.state.CurrentPoints}</Text>
          <Text style={{ marginLeft: 10, fontFamily: 'OpenSans', fontFamily: 'OpenSans', color: '#ffc107', textAlign: 'left' }}>Total Pts</Text>
        </View>
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#212121', width, height: height * 0.20, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ffc107' }}>
          <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 30 }}>Today's Points</Text>
          <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 40 }}>
            {this.state.dailyPoints}
            <Text style={{ fontFamily: 'OpenSans', fontSize: 17 }}>Pts</Text>
          </Text>
        </View>
        <View style={{ width, height: height * 0.22, padding: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>+2 Pts</Text>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>Checking In</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>+10 Pts</Text>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>Under Budget</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>+5 Pts</Text>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>New Goal</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', backgroundColor: '#212121', padding: 5, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ffc107' }}>
          <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: 'white', fontSize: 20 }}>Ranking</Text>
        </View>
        <View style={{ width, height: height * 0.19, padding: 15, paddingTop: 0, paddingBottom: 0 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#e0e0e0' }}>
            <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 17 }}>Local Rank</Text>
            <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 17 }}>{this.state.userLocalRank}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#e0e0e0' }}>
            <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 17 }}>World Rank</Text>
            <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 17 }}>{this.state.userGlobalRank}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalPoints: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 60,
  },
  red: {
    color: 'red',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 200,
    textAlign: 'center',
    backgroundColor: 'yellow',
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
    zIndex: 999999,
  },
});
