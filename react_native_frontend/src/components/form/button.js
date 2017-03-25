import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { getStyleFromProps } from '../../utils';
import { TextFont } from '../text';

export default class Button extends Component {
  render() {
    const style = {
      ...styleButton.container,
      ...getStyleFromProps(['marginTop', 'width', 'flex'], this.props),
    };

    return (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={style} onPress={this.props.onPress}>
          <TextFont style={styleButton.text}>{this.props.children}</TextFont>
        </TouchableOpacity>
      </View>
    );
  }
}

Button.defaultProps = {
  width: 179,
};

Button.propTypes = {
  marginTop: PropTypes.number,
  width: PropTypes.number,
  flex: PropTypes.number,
  onPress: PropTypes.func,
};

const styleButton = {
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 47,
    paddingRight: 47,
    backgroundColor: 'rgba(50, 50, 50, 0.6)',
    borderRadius: 30,
    alignItems: 'stretch',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 3,
  },
};
