import React, {Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BackgroundWrapper } from '../components';
import { Container, Content, Text, Left, transparent, Right, Body, Card, CardItem, ListItem, Separator} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlatformValue } from '../utils';


export default class Points extends Component {

  componentDidMount(){
    this.props.hideSideMenu()
  }

  render() {
    return (
      <Container style={{backgroundColor: 'white'}}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="bars"
            size={30}
            color="white"
            onPress={this.props.sideMenu}/>
          </TouchableOpacity>
          <Text style={{
            fontSize: 25,
            textAlign: 'center',
            width: 250,
            color: 'white',
            fontWeight: '300',
            marginBottom: 5
          }}>
            BUDGET
          </Text>
          <Icon name="diamond" size={20} color="pink" />
        </View>
        <Card>
          <CardItem header>
            <Text style={{fontSize: 100,}}>145</Text>
            <Text>Total</Text>
            <Text> Pts</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Todays Points</Text>
            <Right>
              <Text>20</Text>
              <Text>Pts</Text>
            </Right>
          </CardItem>
        </Card>
        <Content>
          <ListItem>
            <Text>+2 Pts  </Text>
            <Right>
              <Text>Checking In</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Text>+10 Pts  </Text>
            <Right>
              <Text>Under Budget</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Text>+5 Pts  </Text>
            <Right>
              <Text>New Goal</Text>
            </Right>
          </ListItem>
          <Separator bordered>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Ranking</Text>
          </Separator>
          <ListItem icon>
            <Left>
              <Icon name="medal" />
            </Left>
            <Body>
              <Text>Local Rank</Text>
            </Body>
            <Right>
              <Text>5 th</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="medal" />
            </Left>
            <Body>
              <Text>World Rank</Text>
            </Body>
            <Right>
              <Text>105 th</Text>
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
        backgroundColor: '#424242',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#424242'
     },
  });
