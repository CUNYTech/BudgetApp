import React, { Component } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Image, Dimensions, ImagePickerIOS } from 'react-native';
import { Container, Content, Text, Left, Right, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { _localRank } from '../utils/pointHelpers';

const { height, width } = Dimensions.get('window');

export default class Points extends Component {
  constructor() {
    super();
    this.state = { image: 'https://static.pexels.com/photos/7613/pexels-photo.jpg',
      chosenImage: 'https://static.pexels.com/photos/7613/pexels-photo.jpg',
      userName: '',
      userLocalRank: 0,
      userGlobalRank: 0,
      friends: 0 };
  }

  componentWillMount() {
    const uid = this.props.Firebase.auth().currentUser.uid;
    const userName = this.props.Firebase.auth().currentUser.displayName;
    const _this = this;
    const storageRef = this.props.Firebase.storage().ref();

    this._localRank();
    this._getBoard();
    this.setFriends();

    if (this.state.chosenImage === 'https://static.pexels.com/photos/7613/pexels-photo.jpg') {
      this.cameraRoll();
    } else {
      storageRef.child(`${uid}`).getDownloadURL().then((url) => {
        _this.setState({ chosenImage: url, userName });
      });
    }
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
      console.log(error);
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
            const localRank = 0;
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

  cameraRoll() {
    const uid = this.props.Firebase.auth().currentUser.uid;
    // REFERENCE PLACE IN PE
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      this.setState({ image: imageUri });
      this.pickImage();
    }, error => console.log(error));
  }


  pickImage() {
    const _this = this;
    const ref = this.props.Firebase.database().ref();
    const peopleRef = ref.child('/people');
    const uid = this.props.Firebase.auth().currentUser.uid;
    const displayName = this.props.Firebase.auth().currentUser.displayName;
    const Blob = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    const storageRef = this.props.Firebase.storage().ref();
    const rnfbURI = RNFetchBlob.wrap(RNFetchBlob.fs.asset(this.state.image));

    Blob
      .build(rnfbURI, { type: 'image/jpg;' })
      .then((blob) => {
        storageRef
        .child(`${uid}`)
        .put(blob, { contentType: 'image/jpg' })
        .then((snapshot) => {
          blob.close();
          storageRef.child(`${uid}`).getDownloadURL().then((url) => {
            _this.setState({ chosenImage: url });
            peopleRef.child(displayName).update({
              photoUrl: url,
            });
          });
        });
      })
    .catch((err) => {
      console.log('Blob err:', err);
    });
  }


  render() {
    return (
      <Container style={{ backgroundColor: '#212121' }}>
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
            BUDGET
          </Text>
          <Icon name="diamond" size={20} color="#ffc107" />
        </View>
        <Card style={{ backgroundColor: 'black', borderWidth: 0 }}>
          <CardItem header style={{ backgroundColor: 'transparent' }}>
            <View style={styles.containerHeader}>
              <TouchableOpacity onPress={this.cameraRoll.bind(this)}>
                <Image
                  style={styles.icon}
                  source={{ uri: this.state.chosenImage }}
                />
              </TouchableOpacity>
              <Text style={{ color: 'white' }}>{this.state.userName} </Text>
            </View>
          </CardItem>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ width: width * 0.3 }}>
              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                {this.state.friends}
              </Text>
              <Text style={{ color: '#ffc107', fontSize: 12, textAlign: 'center' }}>
                Friends
              </Text>
            </View>
            <View style={{ width: width * 0.3 }}>
              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                {this.state.userLocalRank}
              </Text>
              <Text style={{ color: '#ffc107', fontSize: 12, textAlign: 'center' }}>
                Local Rank
              </Text>
            </View>
            <View style={{ width: width * 0.3 }}>
              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                {this.state.userGlobalRank}
              </Text>
              <Text style={{ color: '#ffc107', fontSize: 12, textAlign: 'center' }}>
                World Rank
              </Text>
            </View>
          </View>

        </Card>
        <Content />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
  containerHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'transparent',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 40,
  },
  icon: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
});
