import React, {Component, PropTypes} from 'react';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager
} from 'react-native';
import {Logo, Heading, BackgroundWrapper, AlertStatus} from '../components';
import { Actions, ActionConst } from 'react-native-router-flux';
import { getPlatformValue } from '../utils';
import { H1,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body,
Icon, Form, Item, Input, Label,Fab,Badge  } from 'native-base';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../theme/'

export default class Dashboard extends Component{


  state = {
    active: false
  };

  render() {
      return (
        <Container style={{backgroundColor:'floralwhite'}}>
               <Header style={{backgroundColor:'transparent'}} noShadow >
                   <Left>
                       <Button onPress ={() => Actions.home()} transparent noShadow>
                           <Icon name='arrow-back' />
                       </Button>
                   </Left>
                   <Body>
                       <Title style={{fontSize: 19,fontFamily: 'OpenSans-Bold',color:'darkolivegreen'}} >DA$HB0@RD</Title>
                   </Body>
                   <Right>
                       <Button transparent noShadow>
                           <Icon name='menu' />
                       </Button>
                   </Right>
               </Header>
        <Content>
                    
                    <View style={{alignItems: "center", top: 100}}>
                        <Fab
                          active={this.state.active}
                          direction="down"
                          style={{ backgroundColor: '#5067FF'}}
                          position="bottomRight"
                          onPress={() => this.setState({ active: !this.state.active })}>
                              <Icon name="share" />
                            <Button style={{ backgroundColor: '#34A34F' }}>
                              <Icon name="logo-whatsapp" />
                            </Button>
                            <Button style={{ backgroundColor: '#3B5998' }}>
                              <Icon name="logo-facebook" />
                            </Button>
                            <Button disabled style={{ backgroundColor: '#DD5144' }}>
                              <Icon name="mail" />
                            </Button>
                      </Fab>
                    </View>
                  </Content>

                  <Footer style={{backgroundColor:'transparent'}} >
                        <FooterTab>
                            <Button>
                                <Icon style={{color:'midnightblue'}} name="stats" />
                                <Text style={{fontFamily: 'OpenSans-Semibold',color:'midnightblue'}} >Budget</Text>
                            </Button>
                            <Button>
                                <Icon style={{color:'darkolivegreen'}} name="cash" />
                                <Text style={{fontFamily: 'OpenSans-Semibold',color:'darkolivegreen'}} >Goals</Text>
                            </Button>
                            <Button >
                                <Icon style={{color:'salmon'}} name="trophy" />
                                <Text style={{fontFamily: 'OpenSans-Semibold',color:'salmon'}}>Points</Text>
                            </Button>
                            <Button>
                                <Icon style={{color:'goldenrod'}} name="people" />
                                <Text style={{fontFamily: 'OpenSans-Semibold',color:'goldenrod'}}>Friends</Text>
                            </Button>
                        </FooterTab>
                  </Footer>


              </Container>


        )
      }
}

const dashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
    loginContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 49,
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: getPlatformValue('android', 25, 45)
    }
});
