import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Text, Left, Right, Body, Card, CardItem, ListItem, Separator } from 'native-base';
import { getPlatformValue } from '../utils';

const { height, width } = Dimensions.get('window');

export default class Points extends Component {

  constructor() {
    super();
    this.state = {
      userLocalRank: 0,
      userRank: 0,
      CurrentPoints: 0,
    };
  }

  componentDidMount() {
    this.setPoints();
    this._getBoard();
    this._localRank();
  }


  async setPoints() {
    try {
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userPointsRef = ref.child('userReadable/userPoints').child(uid);

      userPointsRef.once('value').then((snap) => {
        const points = snap.val().points;
        return points;
      })
      .then((points) => {
        this.setState({ CurrentPoints: points });
      });
    } catch (e) {
      console.log(e);
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
            rankings.forEach((Rank) => {
              if (Rank[0] === user.displayName) {
                this.setState({ userLocalRank: Rank[1] });
              }
            });
          });
      });
    } catch (e) {
      console.log(e);
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
            this.setState({ userRank: Rank[1] });
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'black', margin: 0 }}>
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
        <Card style={{ backgroundColor: 'black', borderWidth: 0 }}>
          <CardItem header style={{ backgroundColor: 'black', margin: 0 }}>
            <Text style={{ fontFamily: 'OpenSans', fontSize: 100, color: '#bdbdbd', fontFamily: 'OpenSans', fontWeight: '100' }}>{this.state.CurrentPoints}</Text>
            <Text style={{ fontFamily: 'OpenSans', color: '#ffc107' }}>Total Pts</Text>
          </CardItem>
          <CardItem footer style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ffc107', backgroundColor: '#212121', height: height * 0.197 }}>
            <Text style={{ fontFamily: 'OpenSans', color: '#bdbdbd', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ffc107', fontSize: 25 }}>Todays Points</Text>
            <Right>
              <Text style={{ fontFamily: 'OpenSans', color: 'white', fontSize: 40 }}>20 <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>Pts</Text></Text>
            </Right>
          </CardItem>
        </Card>
        <Content>
          <ListItem>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>+2 Pts</Text>
            <Right>
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>Checking In</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>+10 Pts</Text>
            <Right>
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>Under Budget</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>+5 Pts</Text>
            <Right>
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>New Goal</Text>
            </Right>
          </ListItem>
          <Separator bordered style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ffc107', backgroundColor: '#212121' }}>
            <Text style={{ fontFamily: 'OpenSans', fontSize: 20, textAlign: 'center', color: '#bdbdbd' }}>Ranking</Text>
          </Separator>
          <ListItem icon>
            <Left>
              <Icon name="certificate" />
            </Left>
            <Body>
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>Local Rank</Text>
            </Body>
            <Right>
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}> {this.state.userLocalRank} </Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="certificate" color="#ffc107" />
            </Left>
            <Body>
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>World Rank</Text>
            </Body>
            <Right>
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>{this.state.userRank}</Text>
            </Right>
          </ListItem>
        </Content>
      </Container>
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
  },
});
