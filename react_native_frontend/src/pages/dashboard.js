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
        <Container>
               <Header style={{backgroundColor:'transparent'}} >
                   <Left>
                       <Button onPress ={() => Actions.home()} transparent>
                           <Icon name='arrow-back' />
                       </Button>
                   </Left>
                   <Body>
                       <Title style={{fontSize: 18, fontFamily: 'OpenSans',color:'whitesmoke'}} >DA$HB0ARD</Title>
                   </Body>
                   <Right>
                       <Button transparent>
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
                                <Icon style={{color:'whitesmoke'}} name="apps" />
                                <Text style={{color:'whitesmoke'}} >Apps</Text>
                            </Button>
                            <Button>
                                <Icon style={{color:'whitesmoke'}} name="camera" />
                                <Text style={{fontFamily: 'OpenSans',color:'whitesmoke'}} >Camera</Text>
                            </Button>
                            <Button >
                                <Icon style={{color:'whitesmoke'}} name="navigate" />
                                <Text style={{fontFamily: 'OpenSans',color:'whitesmoke'}}>Navigate</Text>
                            </Button>
                            <Button>
                                <Icon style={{color:'whitesmoke'}} name="person" />
                                <Text style={{fontFamily: 'OpenSans',color:'whitesmoke'}}>Friends</Text>
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
