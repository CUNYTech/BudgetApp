import React, { Component } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Image, Dimensions, ImagePickerIOS } from 'react-native';
import { Container, Content, Text, Left, Right, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const { height, width } = Dimensions.get('window');

export default class Points extends Component {
  constructor() {
    super();
    this.state = { image: 'https://static.pexels.com/photos/7613/pexels-photo.jpg',
      chosenImage: 'https://static.pexels.com/photos/7613/pexels-photo.jpg' };
  }

  componentWillMount() {
    const _this = this;
    const storageRef = this.props.Firebase.storage().ref();
    storageRef.child('testImageName').getDownloadURL().then((url) => {
      _this.setState({ chosenImage: url });
    });
  }

  cameraRoll() {
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      this.setState({ image: imageUri });
      this.pickImage();
    }, error => console.log(error));
  }


  pickImage() {
    const _this = this;
    const Blob = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    const storageRef = this.props.Firebase.storage().ref();
    const rnfbURI = RNFetchBlob.wrap(RNFetchBlob.fs.asset(this.state.image));


    Blob
      .build(rnfbURI, { type: 'image/jpg;' })
      .then((blob) => {
        storageRef
        .child('testImageName')
        .put(blob, { contentType: 'image/jpg' })
        .then((snapshot) => {
          blob.close();
          storageRef.child('testImageName').getDownloadURL().then((url) => {
            _this.setState({ chosenImage: url });
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
        <View style={{ flex: 1 }}>
          <Image style={{ flex: 1 }} source={{ uri: this.state.chosenImage }} />
        </View>
        <View style={{ marginLeft: 20, position: 'relative' }}>
          <TouchableOpacity>
            <Icon
              name="camera"
              size={30}
              color="white"
              onPress={this.cameraRoll.bind(this)}
            />
          </TouchableOpacity>
        </View>
        <Card style={{ backgroundColor: 'black', borderWidth: 0 }}>
          <CardItem header style={{ backgroundColor: 'transparent' }}>
            <View style={styles.containerHeader}>
              <Image style={styles.thumbnail} source={require('../images/logo.png')} />
              <Text style={{ color: 'white' }}>Insert Name </Text>
            </View>
          </CardItem>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ width: width * 0.3 }}>
              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                10
              </Text>
              <Text style={{ color: '#ffc107', fontSize: 12, textAlign: 'center' }}>
                Friends
              </Text>
            </View>
            <View style={{ width: width * 0.3 }}>
              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                10
              </Text>
              <Text style={{ color: '#ffc107', fontSize: 12, textAlign: 'center' }}>
                Local Ranks
              </Text>
            </View>
            <View style={{ width: width * 0.3 }}>
              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                75th
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
});
