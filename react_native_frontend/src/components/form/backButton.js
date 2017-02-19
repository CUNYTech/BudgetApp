import React, {Component} from 'react';
import {
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class BackButton extends Component {


    render(){

      return (
        <TouchableOpacity key="icon_left" onPress={this.props.onPressIcon} style={styleWrapper.container}>
          <Icon color="#ffffff" size={25} name={this.props.iconLeft} style={styleWrapper.icon}/>
        </TouchableOpacity>
       )
    }
}

const styleWrapper = {
  container: {
    zIndex: 1000,
    position: 'absolute',
    top: 30,
    left: 20,
  },
  icon: {
    opacity: .8,
  }
}
