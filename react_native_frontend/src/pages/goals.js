
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView
} from 'react-native';
import Row from './Row';
import bar from './progressBar'

export default class GoalsTest extends Component {
  constructor(props){
    super(props);
    this.state = {text: 'Add Goal'};
    {/**
      To do:
      create goals dataset
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {text: 'Add Goal'},
      { dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      };
    */}
  }
  render() {
    return (
      <View style={goalstyles.container}>

        <View style = {goalstyles.header}>
          <Text style = {goalstyles.headerText}>Goals</Text>
        </View>

        <View style ={goalstyles.allGoals}>
            <View style={{padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Add a Goal"
                  onChangeText={(text) => this.setState({text})}
                  {/* ^^To do
                    add text to goalsList
                  */}
                />

                <Text style={{padding: 10, fontSize: 42}}>
                  {this.state.text} {/* placeholder for goal input */}
                </Text>
                <Text style = {goalstyles.placeholdlist}> Goal 1 </Text>
                <Text style = {goalstyles.placeholdlist}> Goal 2 </Text>
                <Text style = {goalstyles.placeholdlist}> Goal 3 </Text>
                {/*
                  To do:
                  render goals to list-
                  <ListView
                  style={styles.listCont}
                  dataSource={this.state.dataSource}
                  renderRow={(data) => <Row {...data} />}
                  />
                */}
            </View>
        </View>

        <View style = {goalstyles.statGoal}>
          <Text style={{padding: 10, fontSize: 42}}>Goal 1</Text>
            {/*To do:
              add progressBar
              add points
              add Image
            */}

        </View>
      </View>
    );
  }
}

const goalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    height: 50,
    backgroundColor: '#00BFA5',
  },
  headerText: {
    padding: 20,
    textAlign: 'center',
    fontSize:20,
  },
  placeholdlist: {
    marginLeft: 12,
    padding: 10,
    fontSize: 16,
  },
  allGoals: {
    flex: 2,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff'
  },
  listCont: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statGoal: {
    flex: 2,
    backgroundColor: '#1DE9B6',
  }
});
