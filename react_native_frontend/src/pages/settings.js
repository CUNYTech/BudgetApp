import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Text, Left, Right, Body, ListItem, Switch, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';


export default class Settings extends Component {
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
          <Text style={styles.textSeparators}>Settings</Text>
          <Icon name="diamond" size={20} color="pink" />
        </View>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
          <Content>
            <ListItem itemDivider>
              <Text>General</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="user-o" />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.accountsettings}>
                  <Text>Account Settings</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="bell-o" />
              </Left>
              <Body>
                <Text>Notifications</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="usd" />
              </Left>
              <Body>
                <Text>Currency</Text>
              </Body>
              <Right>
                <Text>USD</Text>
                <Icon name="angle-right" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="cloud-upload" />
              </Left>
              <Body>
                <Text>Backup</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="history" />
              </Left>
              <Body>
                <Text>Number Of Backups</Text>
              </Body>
              <Right>
                <Badge>
                  <Text>2</Text>
                </Badge>
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>Social Media</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="facebook" />
              </Left>
              <Body>
                <Text>Facebook</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="google" />
              </Left>
              <Body>
                <Text>Google</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="twitter" />
              </Left>
              <Body>
                <Text>Twitter</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="instagram" />
              </Left>
              <Body>
                <Text>Instagram</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>Security</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="key" />
              </Left>
              <Body>
                <Text>Password To Login</Text>
              </Body>
              <Right>
                <Switch valur={false} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="unlock" />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.changepassword}>
                  <Text>Change Password</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" />
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>Support</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="inbox" />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.reportproblem}>
                  <Text>Report A Problem</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="user-secret" />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.privacy}>
                  <Text>Privacy Settings</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="trash" />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.accountdelete}>
                  <Text>Delete Account</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" />
              </Right>
            </ListItem>
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
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#424242',
  },
  textSeparators: {
    fontSize: 25,
    textAlign: 'center',
    width: 250,
    color: 'white',
    fontWeight: '300',
    marginBottom: 5,
  },
});
