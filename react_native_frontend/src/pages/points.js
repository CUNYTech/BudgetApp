import React, {Component, PropTypes} from 'react';
import { AppRegistry, View, Image, StyleSheet, Animated, InteractionManager} from 'react-native';
import { Logo, Heading, BackgroundWrapper, AlertStatus} from '../components';
import { Container, Content, Header, Footer, FooterTab, Button, Icon, Text, Badge,
          Left, transparent, Right, Body, Title, Card, CardItem, ListItem, Separator} from 'native-base';
import { Actions} from 'react-native-router-flux';

export default class Points extends Component {
      render() {
          return (
            <Container>
                <Button full>
                  <Title>Hoola</Title>
                </Button>

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

                <Footer >
                    <FooterTab>
                        <Button>
                            <Icon name="home" />
                        </Button>
                        <Button>
                            <Icon name="camera" />
                        </Button>
                        <Button active>
                            <Icon active name="ribbon" />
                        </Button>
                        <Button>
                            <Icon name="person" />
                        </Button>
                    </FooterTab>
                </Footer>
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
    }
  });

  AppRegistry.registerComponent('LotsOfStyles', () => LotsOfStyles);
