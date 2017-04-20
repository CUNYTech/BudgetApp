import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getPlatformValue } from '../../utils';

const { height, width } = Dimensions.get('window');

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

export default class PointsSnapshot extends Component {

  constructor() {
    super();
    this.state = {
      dailyPoints: 0,
      CurrentPoints: 0,
      userGlobalRank: 0,
      userLocalRank: 0,
    };
  }

  componentWillMount() {
    this.setPoints();
    this._getBoard();
    this._localRank();
  }

  componentDidMount() {
  }

  navPoints() {
    Actions.points();
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

  async setPoints() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userPointsRef = ref.child('userReadable/userPoints').child(uid);
      const userDailyPointsRef = ref.child('userReadable/userDailyPoints').child(uid);

      userDailyPointsRef.once('value').then((snap) => {
        const dailyPoints = snap.val().points;
        this.setState({ dailyPoints });
      });

      userPointsRef.once('value').then((snap) => {
        const points = snap.val().points;
        return points;
      })
      .then((points) => {
        this.setState({ CurrentPoints: points });
      });
    } catch (e) {
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.navPoints.bind(this)} style={styles.pointSection}>
        <View style={styles.button}>
          <Text style={styles.headerText}>
            DAILY POINTS
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 17 }}>Total Points</Text>
          <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>{this.state.CurrentPoints}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 13 }}>Local Rank</Text>
            <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>{this.state.userLocalRank}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 13 }}>Global Rank</Text>
            <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>{this.state.userGlobalRank}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'OpenSans', textAlign: 'center', fontSize: 17 }}>Earned Today</Text>
          <Text style={{ fontFamily: 'OpenSans', textAlign: 'center', color: theme.accent, fontSize: 25 }}>{this.state.dailyPoints}</Text>
        </View>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
          <StockLine data={graphData} options={options} xKey="x" yKey="y" />
        </ScrollView> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  pointSection: {
    width: width * 0.51,
    backgroundColor: 'black',
  },
  button: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerText: {
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: 'OpenSans',
    fontSize: 17,
    color: '#e0e0e0',
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    width: null,
    height: null,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  bgFilter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
