import React, {Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BackgroundWrapper } from '../components';
import { Container, Content, Text, Left, transparent, Right, Body, Card, CardItem, ListItem, Separator, Thumbnail} from 'native-base';
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
            <View style={styles.containerHeader}>
              <Image style={styles.thumbnail} source={require('../images/logo.png')} />
              <Text>Insert Name </Text>
            </View>
          </CardItem>
          <Left>
            <Text style={{
              fontSize: 15,
              textAlign: 'left',
              width: 250,
              fontWeight: '300',
              marginBottom: 5
            }}>
              10
            </Text>
            <Text style={{
              marginLeft: -15,
              marginTop: -10,
            }}>
              Friends
            </Text>
          </Left>
          <View style={styles.container}>
            <Text style={{
              fontSize: 15,
              textAlign: 'center',
              width: 250,
              fontWeight: '300',
              marginTop: -65,
            }}>
              5th
            </Text>
            <Text style={{
              marginLeft: -5,
              marginTop: 0,
            }}>
              Local Rank
            </Text>
          </View>
          <Right>
            <View style={styles.container}>
              <Text style={{
                fontSize: 15,
                textAlign: 'right',
                width: 250,
                fontWeight: '300',
                marginTop: -130,
              }}>
                75th
              </Text>
              <Text style={{
                marginLeft: 230,
                marginTop: 0,
              }}>
                World Rank
              </Text>
            </View>
          </Right>
        </Card>
        <Content>
          
        </Content>
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
        backgroundColor: '#424242',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#424242'
     },
     containerHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
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
