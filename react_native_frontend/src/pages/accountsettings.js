import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Text, Left, Right, ListItem, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';


export default class AccountSettings extends Component {

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
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
              Account Settings
          </Text>
          <Icon name="diamond" size={20} color="pink" />
        </View>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
          <ListItem>
            <Left>
              <Text>Work In Progress</Text>
            </Left>
            <Right>
              <Spinner color="red" />
            </Right>
          </ListItem>
        </ScrollView>
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
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#424242',
  },
});
