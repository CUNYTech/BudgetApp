import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Text, Left, Right, Body, ListItem, Switch, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';


export default class Settings extends Component {
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
          <Text style={{
            fontSize: 25,
            textAlign: 'center',
            width: 250,
            color: 'white',
            fontWeight: '300',
            marginBottom: 5,
          }}>
          Settings
          </Text>
          <Icon name="diamond" size={20} color="#ffc107" />
        </View>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
          <Content>
            <ListItem itemDivider style={{ backgroundColor: 'black' }}>
              <Text style={{ fontFamily: 'OpenSans', color: '#ffc107', fontWeight: '600' }}>General</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="user-o" style={{ color: 'white' }} />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.accountsettings}>
                  <Text style={{ color: '#bdbdbd' }}>Account Settings</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" style={{ color: 'white' }} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="bell-o" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Notifications</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="usd" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Currency</Text>
              </Body>
              <Right>
                <Text style={{ color: '#bdbdbd' }}>USD</Text>
                <Icon name="angle-right" style={{ color: 'white' }} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="cloud-upload" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Backup</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="history" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Number Of Backups</Text>
              </Body>
              <Right>
                <Badge>
                  <Text style={{ color: '#bdbdbd' }}>2</Text>
                </Badge>
              </Right>
            </ListItem>
            <ListItem itemDivider style={{ backgroundColor: 'black' }}>
              <Text style={{ fontFamily: 'OpenSans', color: '#ffc107', fontWeight: '600' }}>Social Media</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="facebook" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Facebook</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="google" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Google</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="twitter" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Twitter</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="instagram" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Instagram</Text>
              </Body>
              <Right>
                <Switch valur />
              </Right>
            </ListItem>
            <ListItem itemDivider style={{ backgroundColor: 'black' }}>
              <Text style={{ fontFamily: 'OpenSans', color: '#ffc107', fontWeight: '600' }}>Security</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="key" style={{ color: 'white' }} />
              </Left>
              <Body>
                <Text style={{ color: '#bdbdbd' }}>Password To Login</Text>
              </Body>
              <Right>
                <Switch valur={false} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="unlock" style={{ color: 'white' }} />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.changepassword}>
                  <Text style={{ color: '#bdbdbd' }}>Change Password</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" style={{ color: 'white' }} />
              </Right>
            </ListItem>
            <ListItem itemDivider style={{ backgroundColor: 'black' }}>
              <Text style={{ fontFamily: 'OpenSans', color: '#ffc107', fontWeight: '600' }}>Support</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="inbox" style={{ color: 'white' }} />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.reportproblem}>
                  <Text style={{ color: '#bdbdbd' }}>Report A Problem</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" style={{ color: 'white' }} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="user-secret" style={{ color: 'white' }} />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.privacy}>
                  <Text style={{ color: '#bdbdbd' }}>Privacy Settings</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" style={{ color: 'white' }} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="trash" style={{ color: 'white' }} />
              </Left>
              <Body>
                <TouchableOpacity onPress={Actions.accountdelete}>
                  <Text style={{ color: '#bdbdbd' }}>Delete Account</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="angle-right" style={{ color: 'white' }} />
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
    backgroundColor: 'black',
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
  itemDividerText: {
    backgroundColor: 'black',
  },
});
