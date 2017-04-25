import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class AccountDelete extends Component {

  async deleteAccount() {

      try {
          const user = firebase.auth().currentUser;
          user.delete().then(Actions.login())
      } catch (e) {
      }
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
          <Text style={{color: 'white', fontSize:25, textAlign:'center', width:250, fontWeight:'300', marginBottom:5}}>Delete Account</Text>
          <Icon name="diamond" size={20} color="gold" />
        </View>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
            <Content>
                <Text style={{color:'white', textAlign: 'center', padding: 2, marginBottom: 50, marginTop: 10}}>
                    Warning: Deleting your account will remove all traces of it from the database. You will have to recreate an
                    account if you wish to use Scale again.
                </Text>
                <Button full danger onPress={this.deleteAccount.bind(this)}>
                    <Text>Delete Account</Text>
                </Button>
            </Content>
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
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#424242',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    width: 250,
    color: 'white',
    fontWeight: '300',
    marginBottom: 5,
  },
  selectionText: {
    color: 'white'
  }
});
