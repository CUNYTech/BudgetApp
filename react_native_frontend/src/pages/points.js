import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Text, Left, Right, Body, Card, CardItem, ListItem, Separator } from 'native-base';
import { getPlatformValue } from '../utils';

const { height, width } = Dimensions.get('window');

export default class Points extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Container style={{ backgroundColor: 'black' }}>
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
            <Text style={{ fontFamily: 'OpenSans', fontSize: 100, color: '#bdbdbd', fontFamily: 'OpenSans', fontWeight: '100' }}>145</Text>
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
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>5 th</Text>
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
              <Text style={{ fontFamily: 'OpenSans', color: 'white' }}>105 th</Text>
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
